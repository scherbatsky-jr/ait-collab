const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');
const session = require('express-session');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const jwt = require('jsonwebtoken');

dotenv.config();

const allowedOrigins = ['http://localhost:20171'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));

// Connect to MongoDB
const dbURI = process.env.MONGODB_URI

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check for MongoDB connection errors
const db = mongoose.connection;
db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});
db.once('open', () => {
  console.log('Connected to MongoDB:', dbURI);
});

// Passport Configuration
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// Include passport initialization and strategy here

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.PASSPORT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

function authenticateToken(req, res, next) {
  const token = req.header('Authorization').split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}


// Include routes
const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/user', authenticateToken, userRoutes);

const schoolRoutes = require('./routes/schoolRoutes')
app.use('/school', schoolRoutes);

// Default route
app.get('/', (req, res) => {
    res.json({ name: process.env.APP_NAME, version: process.env.APP_PORT });
});

// Start the server
const port = process.env.PORT || 20178;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
