// middlewares/auth.middleware.js
const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
   const token = req.cookies.token;
  if (!token) {
    return res.redirect('/login')
  } 
  

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
}

module.exports = authMiddleware;
