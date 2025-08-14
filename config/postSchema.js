const mongoose = require('mongoose')
const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        trim: true,
        maxlength: 1000,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        text: {
            type: String,
            required: true,
            maxlength: 500
        },
        commentLikes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        replies: [{
            user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
            },
            replyLikes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
            }],
            text: {
            type: String,
            required: true,
            maxlength: 500
            },
            createdAt: {
            type: Date,
            default: Date.now
            }
     }],
  createdAt: {
    type: Date,
    default: Date.now
  }
    }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
});

// postSchema.pre('save', function (next) {
//     if (this.isModified()) {
//         this.updatedAt = Date.now()
//     }
//     next()
// })

module.exports = mongoose.model('Post', postSchema)