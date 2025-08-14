const express = require('express')
const router = express.Router()
const Post = require('../config/postSchema')

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find({ likes: req.user.id }).populate('author', 'avatar username')
        // console.log(posts);
        res.render("likesContent", { posts });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

module.exports = router;  