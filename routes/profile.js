const express = require('express')
const router = express.Router()
const moment = require('moment');

const Post = require('../config/postSchema')
const User = require('../config/usersSchema')
const upload = require('../middlewares/upload')
const {editProfile, getData} = require('../controllers/editProfile.controller')


// Render profile page with user and their posts
router.get('/', getData, async (req, res) => {
    const user = req.user;
    const posts = await Post.find({ author: user._id })
        .populate('author', '_id username avatar')
        .sort({ createdAt: -1 });
    res.render('profile', { user, posts, moment });
});
// API endpoint to get user posts as JSON (for AJAX fetch)
// router.get('/posts', getData, async (req, res) => {
//     try {
//         const user = req.user;
//         const posts = await Post.find({ author: user._id })
//             .populate('author', '_id username avatar')
//             .sort({ createdAt: -1 });
//         res.json({ success: true, posts, user: { username: user.username, avatar: user.avatar } });
//     } catch (err) {
//         res.json({ success: false, message: 'Error fetching posts' });
//     }
// });
router.get('/edit', getData, (req, res) => {
    res.render('editProfile', { user: req.user });
});  

router.put('/edit/:editId', upload.single('avatar'), editProfile);  

router.get('/:profileId', getData, async (req, res) => {
    const user = await User.findById(req.params.profileId)
     

    if (!user) {
        return res.status(404).json({success: false, message: 'user Not found'})
    }

    const posts = await Post.find({ author: user._id })
        .populate('author', '_id username avatar')
        // .populate('author', '_id username')
        .sort({ createdAt: -1 });
    if (!posts) {
        return res.status(404).json({success: false, message: 'Posts Not found'})
    }
    res.render('userProfile', { user, currentUser: req.user, posts, moment });
});  




module.exports = router;   