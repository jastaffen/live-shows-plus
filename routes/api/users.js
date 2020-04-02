const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const axios = require('axios');
const {parse, stringify} = require('flatted/cjs');

const User = require('../../models/User');
const Profile = require('../../models/Profile');

// @route      post
// desc        register user
// access      public

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], 
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); 
    }
    const { name, email, password } = req.body;

    try {
        // see if user exists   
       let user = await User.findOne({ email });

        if (user) {
            res.status(400).json({ errors: [{ msg: 'User already exists' }] });
        }

        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });

        // creates a new instance of a user but does not save it
        user = new User({
            name,
            email,
            avatar,
            password
        });

        // encrypt password
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        // saves user to the database
        await user.save();


        // return jsonwebtoken
        
        const payload = {
            user: {
                id: user.id,
            }
        }

        jwt.sign(
            payload, 
            config.get('jwtSecret'),
            { expiresIn: 360000 }, 
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   /user/:user_id
router.get('/user/:user_id', auth, async (req, res) => {
    try {
        let profile = await Profile.findOne({user: req.params.user_id});
        const { favoriteArtists } = profile;
        console.log(favoriteArtists);
        if (favoriteArtists.length < 1) {
            return res.send({ msg: 'No favorite artists. Add some to see some shows!'})
        }
        let videoObj = {};
        let data;
        for (let artist of favoriteArtists) {
            data = await addVideos(artist);
            videoObj[artist] = data;
        }

        return res.send(videoObj);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
    
});

const addVideos = async artist => {
    let body = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${artist}+full+concert&type=video&videoDuration=long&key=${config.get('apiKey')}`);
    // console.log(body.data.items);
    return body.data.items;
}

module.exports = router;