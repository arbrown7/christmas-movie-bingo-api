const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/.env' });

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
require('./config/passport'); // Your Google strategy

const { swaggerUi, specs } = require('./swagger.js');
const movieRoutes = require('./routes/movieRoutes');
const bingoRoutes = require('./routes/bingoRoutes');
const { ensureAuthenticated } = require('./middleware/auth');

const app = express();

// --- Middleware ---

// Body parser
app.use(express.json());

// CORS
app.use(cors({
  origin: [
    'http://localhost:5173',        // Local Vite dev server
    'https://christmas-movie-bingo-v2.onrender.com' // Replace with your final URL
  ],
  credentials: true // Important for cookies/session
}));

// Sessions (before passport middleware)
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'supersecret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // set to true if using HTTPS
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// --- Routes ---

// Google Auth
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login-failed',
    successRedirect: 'https://christmas-movie-bingo-v2.onrender.com',
  })
);

app.get('/login-success', (req, res) => res.send('Login successful!'));
app.get('/login-failed', (req, res) => res.send('Login failed'));
app.get('/logout', (req, res) => {
  req.logout(() => {
    res.send('Logged out');
  });
});
app.get('/api/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ loggedIn: true, user: req.user });
  } else {
    res.json({ loggedIn: false });
  }
});

// Protected API routes
app.use('/api/movies', ensureAuthenticated, movieRoutes);
app.use('/api/bingo', ensureAuthenticated, bingoRoutes);

// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// --- MongoDB ---
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

mongoose.connection.once('open', () => {
  console.log(`Connected to DB: ${mongoose.connection.name}`);
});

// --- Start server ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
