// controllers/Getusers.controller.js
const User = require('../config/usersSchema');


async function getData(req, res, next) {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized: user not found' });
    }
    const user = await User.findById(req.user.id).select('-password')
    req.user = user;
    next();
}



async function editProfile(req, res) {
    // Exclude password from the response
    try {
        const { username, email, bio } = req.body;
        let avatar = req.user.avatar
        if (req.file) {
            avatar = '/uploads/' + req.file.filename
        }


         const updated = await User.findByIdAndUpdate(
         req.params.editId,
        { username, email, bio, avatar }, 
        { new: true }
        ).select('-password');
         
        res.render('profile', { user: updated, message: 'تم حفظ المعلومات بنجاح' });
} catch (error) {
    res.status(500).json({ 
        message: 'Server Error Edit', 
        error: error.message, // يرسل السبب الحقيقي
        stack: error.stack // اختيارياً، للتشخيص
    });

}
}

module.exports = {editProfile, getData}