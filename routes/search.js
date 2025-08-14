const express = require('express');
const User = require('../config/usersSchema');
const router = express.Router()

router.get('/', (req, res) => {
    res.render('search');
});
router.get('/findUser', async (req, res) => {
    try {
        const query = req.query.q || ""
        const users = await User.find({ username: { $regex: query , $options: "i"} }).select("-password -email -bio")
        res.json({ success: true, users })
        // console.log(users) 
    } catch (err) {
        res.status(500).json({err: "server error"})
    }
});



module.exports = router;  