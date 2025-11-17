const dotenv = require('dotenv');
const result = dotenv.config({ path: __dirname + '/.env' });

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('./config/passport');
const { swaggerUi, specs } = require('./swagger.js');
const familyRoutes = require('./routes/familyRoutes');
const giftRoutes = require('./routes/giftRoutes');


const app = express();
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

mongoose.connection.once('open', () => {
  console.log(`Connected to DB: ${mongoose.connection.name}`);
});

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login-failed',
    successRedirect: '/login-success',
  })
);

app.get('/login-success', (req, res) => {
  res.send('Login successful!');
});

app.get('/login-failed', (req, res) => {
  res.send('Login failed');
});

app.get('/logout', (req, res) => {
  req.logout(() => {
    res.send('Logged out');
  });
});

const { ensureAuthenticated } = require('./middleware/auth');
app.use('/api/family', ensureAuthenticated, familyRoutes);
app.use('/api/gifts', ensureAuthenticated, giftRoutes);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
