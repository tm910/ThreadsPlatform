const express = require('express')
const router = express.Router()
const {signup} = require('../controllers/auth.controller')
const { validateSignup } = require('../validations/auth.validation')
router.get('/', (req, res) => {
  res.render('signup')
})    
router.post('/', validateSignup, signup);

module.exports = router;       