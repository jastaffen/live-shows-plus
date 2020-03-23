const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Video = require('../../models/Video');

// @route     Post api/videos
// @desc      add a saved video
// @access    Private
router.post('/', auth, async (req, res) => {

    try {
        const {
            videoId,
            title,
            publishedAt,
            thumbnails
        } = req.body;

        videoFields = {};
        videoFields.user = req.user.id;
        videoFields.videoId = videoId;
        videoFields.snippet = {
            title: title,
            publishedAt: publishedAt,
        }
        videoFields.thumbnails = thumbnails;

        // Create new saved video
        let video = new Video(videoFields);
        await video.save();
        res.json(video);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
    
});

// @route     GET api/videos
// @desc      get a users saved videos
// @access    Private
router.get('/saved', auth, async (req, res) => {
    try {
        let videos = await Video.find({user: req.user.id});
        res.json(videos);
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error')
    }
});

module.exports = router;