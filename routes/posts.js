//routes/posts.js
const express = require('express')
const router = express.Router()
const Post = require('../config/postSchema')
const {getData} = require('../controllers/editProfile.controller')
const auth = require('../middlewares/auth.middleware')

router.post('/create', auth, async (req, res) => {
    try {
        const { content } = req.body
        const newPost = new Post({
            content,
            author: req.user.id
        })

        await newPost.save()
        res.status(201).json({success: true, message: 'Post created successfully'})
    } catch (e) {
        res.status(500).json({success: false, message: 'server error <Post>', error: e.message})
    }
})

//likes
router.post('/likes/:likeId', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.likeId)
 
        if (!post) return res.status(404).json({ message: 'المنشور غير موجود' })

        const likedIndex = post.likes.indexOf(req.user.id)
        let liked = null
        if (likedIndex === -1) {
          post.likes.push(req.user.id)
          liked = true
          
        } else {
          post.likes.splice(likedIndex, 1)
          liked = false
        }
        await post.save()
        res.status(201).json({success: true, message: 'like added successfully', liked: liked});
      } catch (error) {
          res.status(500).json({ success: false, message: 'Server error Post likes', error: error });
      }
});
// Add comment to post
router.post('/comments/:commentId', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.commentId)
    if (!post) return res.status(404).json({ message: 'المنشور غير موجود' })

    const comment = {
      user: req.user.id,
      text: req.body.text,
      createdAt: new Date()
    }
    post.comments.push(comment)
    await post.save()
    // await post.populate('comments.user', 'username avatar')
    res.status(201).json({ success: true, message: 'تم إضافة تعليق بنجاح', comment })
  } catch (error) {
    res.status(500).json({ message: 'خطأ في الخادم' })
  }
})

router.delete('/delPost/:id', auth, async (req, res) => {
    try {
        const deleted = await Post.findByIdAndDelete(req.params.id)
        if (!deleted) return res.status(404).json({ success: false, message: 'المنشور غير موجود' })

        res.status(200).json({ success: true, message: 'تم الحذف بنجاح' })
    } catch (error) {
        res.status(500).json({ success: false, message: 'خطأ في الخادم' })
    }

})

// Comments Likes router
router.post('/:postId/commentLikes/:commentId', auth, async (req, res) => {
    try {
        const { postId, commentId } = req.params;
        const userId = req.user.id;
    
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        const comment = post.comments.id(commentId);
        if (!comment) return res.status(404).json({ message: 'Comment not found' });

        const index = comment.commentLikes.indexOf(userId);

        if (index === -1) {
            comment.commentLikes.push(userId);
        } else {
            comment.commentLikes.splice(userId, 1)
        }
        await post.save();
        res.status(201).json({
            success: true,
            message: 'Send successfully',
            isLiked: index === -1 ? true : false,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Replay router
router.post('/:postId/reply/:commentId', auth, async (req, res) => {
    try {

        const { postId, commentId } = req.params;
        const { text } = req.body;
        const userId = req.user.id;
    
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        const comment = post.comments.id(commentId);
        if (!comment) return res.status(404).json({ message: 'Comment not found' });

        comment.replies.push({ user: userId, text });
        await post.save();
        res.status(201).json({ success: true, message: 'Reply added', comment });
    } catch (err) { 
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Replay Likes router
router.post('/:postId/replyLikes/:commentId/:replyId', auth, async (req, res) => {
    try {
        const { postId, commentId, replyId } = req.params;
        const userId = req.user.id;
    
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        const comment = post.comments.id(commentId);
        if (!comment) return res.status(404).json({ message: 'Comment not found' });

        const reply = comment.replies.id(replyId)
        if (!reply) return res.status(404).json({ message: 'Comment not found' });

        const index = reply.replyLikes.indexOf(userId)

        if (index === -1) {
            reply.replyLikes.push(userId);
        } else {
            reply.replyLikes.splice(index, 1)
        }
        await post.save();
        res.status(201).json({
            success: true,
            message: index === -1 ? 'Reply liked' : 'Reply unliked',
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
  }
});



module.exports = router 