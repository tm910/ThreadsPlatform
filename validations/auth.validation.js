
const { body, validationResult } = require('express-validator');

// Signup validation middleware
const validateSignup = [
  body('username')
    .notEmpty().withMessage('اسم المستخدم مطلوب')
    .isLength({ min: 3 }).withMessage('اسم المستخدم يجب أن يكون 3 أحرف على الأقل'),
  body('email')
    .notEmpty().withMessage('البريد الإلكتروني مطلوب')
    .isEmail().withMessage('صيغة البريد الإلكتروني غير صحيحة'),
  body('password')
    .notEmpty().withMessage('كلمة المرور مطلوبة')
    .isLength({ min: 6 }).withMessage('كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success: false, message: errors.array().map(e => e.msg) });
    }
    next();
  }
];

const validateLogin = [
  body('email')
    .notEmpty().withMessage('البريد الإلكتروني مطلوب')
    .isEmail().withMessage('صيغة البريد الإلكتروني غير صحيحة'),
  body('password')
    .notEmpty().withMessage('كلمة المرور مطلوبة')
    .isLength({ min: 6 }).withMessage('كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success: false, message: errors.array().map(e => e.msg) });
    }
    next();
  }
];

module.exports = { validateSignup, validateLogin };
