const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VideoSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    videoId: {
        type: String,
        required: true
    },
    snippet: {
        publishedAt: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        }
    },
    thumbnails: {
        small: {
            url: {
                type: String,
                required: true
            },
            width: {
                type: Number,
                required: true
            },
            height: {
                type: Number, 
                required: true
            }
        }, 
        medium: {
            url: {
                type: String,
                required: true
            },
            width: {
                type: Number,
                required: true
            },
            height: {
                type: Number,
                required: true
            }
        }
    }
});

module.exports = Video = mongoose.model('video', VideoSchema);