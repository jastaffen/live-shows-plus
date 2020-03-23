const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);


const Profile = require('../../models/Profile');
const User = require('../../models/User');


// @route    GET api/profile/me
// @desc     GET current users profile
// @access   Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id })
            .populate('user', ['name', 'avatar']);
        if (!profile) return res.status(400).json({ msg: 'There is no profile for this user' });

        res.json(profile);


    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

// @route    Post api/profile
// @desc     Create or update user profile
// @access   Private
router.post('/', [auth, [
    check('status', 'Status is required').not().isEmpty(),
    check('location', 'Location is required').not().isEmpty()
    ]
], 
async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        bio,
        location,
        status,
        favoriteArtists
     } = req.body;

    const profileFields = {};
    profileFields.user = req.user.id;
    if (bio) profileFields.bio = bio;
    if (location) profileFields.location = location;
    if (status) profileFields.status = status;
    if (favoriteArtists) {
        profileFields.favoriteArtists = favoriteArtists
            .split(',').map(artist => artist.trim());
    }

    
    try {

        let profile = await Profile.findOne({ user: req.user.id });

        if (profile) {
            // Update
            profile = await Profile
                .findOneAndUpdate(
                    { user: req.user.id }, 
                    { $set: profileFields }, 
                    { new: true }
                );
            return res.json(profile);
        }

        // Create
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Sever Error');
    }

});

// @route     GET api/profile
// @desc      get all profiles
// @access    public
router.get('/', async (req, res) => {
    try {
        let profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route     GET api/profile/user/:userId
// @desc      get a user's profile
// @access    public
router.get('/user/:user_id', async (req, res) => {
    try {
        let profile = await Profile
        .findOne({ user: req.params.user_id })
            .populate('user', ['name', 'avatar']);

        if (!profile) return res.status(400).json({ msg: 'Profile Not Found' });

        res.json(profile);
    } catch(err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'Profile Not Found' });
        }
        res.status(500).send('Server Error')
    }
    
});


// @route     Delete api/profile
// @desc      delete profile, user, and posts
// @access    private
router.delete('/', auth, async (req, res) => {
    try {
        // Remove profile
        await Profile.findOneAndRemove({ user: req.user.id });
        // Remove user
        await User.findOneAndRemove({ _id: req.user.id });

        res.json({ msg: 'User deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

// @route     Put api/profile/favorite-artists
// @desc      add Favorite Artists
// @access    private
router.put('/favorite-artists', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        for (let artist of req.body.favoriteArtists) {
            if (!profile.favoriteArtists.includes(artist)) {
                profile.favoriteArtists.unshift(artist);
            }
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



// @route     Delete api/profile/favorite-artists
// @desc      Delete Favorite Artist from profile
// @access    private
router.delete('/favorite-artists', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        let favoriteArtistsSansArtist = [...profile.favoriteArtists].filter(artist => artist !== req.body.artist);
        profile.favoriteArtists = favoriteArtistsSansArtist;
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;