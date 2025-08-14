// app.js
const express = require('express');
const moment = require('moment');
const connectDB = require('./config/db');
const Post = require('./config/postSchema'); // Assuming you have a Post model
const {getData} = require('./controllers/editProfile.controller')
const PORT = process.env.PORT || 3000;
const path = require('path');
const cookieParser = require('cookie-parser');



const setupLiveReload = require('./autoReload.js');


// Connect to MongoDB
connectDB();

const cors = require('cors');
const app = express();
setupLiveReload(app) 


app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

//Login Routes
app.use('/signup', require('./routes/signup.js'));//  signup
app.use('/login', require('./routes/login.js'));   // Login

// Authentication middleware
const authMiddleware = require('./middlewares/auth.middleware');
app.get('/', authMiddleware, getData, async (req, res) => {
  try {
        const posts = await Post.find()
            .populate('author', '_id username avatar')
            .populate('comments.user', '_id username avatar ')
            .populate('comments.replies.user')
            .populate('likes', '_id')
            .sort({ createdAt: -1 })
        res.render('index', { posts, moment, currentUser: req.user});
      } catch (error) {
          res.status(500).json({ success: false, message: 'Server error', error: error.message });
      }
});
 

// app.use('/', require('./routes/index.js')); // Home route
app.use('/profile', authMiddleware, require('./routes/profile.js'));
app.use('/likes', authMiddleware, require('./routes/likesContent.js'));
app.use('/search',authMiddleware, require('./routes/search.js'));
app.use('/posts', require('./routes/posts.js'));

app.use((req, res) => {
  res.status(404).render('errorPage');
}); 

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
     