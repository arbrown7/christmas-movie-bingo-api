const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/.env' });

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
require('./config/passport');

const { swaggerUi, specs } = require('./swagger.js');
const movieRoutes = require('./routes/movieRoutes');
const bingoRoutes = require('./routes/bingoRoutes');

const app = express();

app.use(express.json());

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://christmas-movie-bingo-v2.onrender.com'
  ],
  credentials: true
}));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { 
      sameSite: 'none',
      secure: true
     }
  })
);

app.use(passport.initialize());
app.use(passport.session());


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
/*app.get('/api/user', (req, res) => {
  console.log('session:', req.session);
  console.log('user:', req.user);

  res.json({
    loggedIn: req.isAuthenticated(),
    user: req.user || null
  });
});*/

app.use('/api/movies', movieRoutes);
app.use('/api/bingo', bingoRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

mongoose.connection.once('open', () => {
  console.log(`Connected to DB: ${mongoose.connection.name}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
