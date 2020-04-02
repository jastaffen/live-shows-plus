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

// @route     Delete api/videos
// @desc      unsaves a saved video
// @access    Private
router.delete('/:id', auth, async (req, res) => {
    try {
        let video = await Video.findById(req.params.id);

        if (!video) {
            res.status(404).send('Video not found')
        }
        
        if (video.user.toString() !== req.user.id) {
            return res.status(404).send({ msg: 'User not authorized'})
        }

        await video.remove();

        res.json({ msg: 'video unsaved'});
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            res.status(404).send('Video not found')
        }
    }
});

// @route     GET api/videos
// @desc      get all users saved videos
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