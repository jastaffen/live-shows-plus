const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    bio: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    favoriteArtists: {
        type: [String],
        required: true
    }
});

module.exports = Profile= mongoose.model('profile', ProfileSchema);