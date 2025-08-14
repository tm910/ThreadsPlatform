const express = require('express')
const router = express.Router()
const {login} = require('../controllers/auth.controller')
const { validateLogin } = require('../validations/auth.validation')


router.get('/', (req, res) => {
    res.render('login', { title: 'Login to Threads' });
});

router.post('/', validateLogin, login);


module.exports = router;  