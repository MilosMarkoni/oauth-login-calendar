const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const ejs = require('ejs');
const passportSetup = require('./config/passport-setup');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');

const app = express();

// Set up view engine
app.set('view engine','ejs');

// Setting up cookie to last up to one day, and passing the keys
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

// initialize passport and cookies
app.use(passport.initialize());
app.use(passport.session());

// Connect to mongodb
mongoose.connect(keys.mongodb.dbURI,{useNewUrlParser: true },() => {
    console.log('Connected to the database!');
})

// Set up routes (attach /auth as prefix for inside routes)
app.use(authRoutes);
app.use('/profile',profileRoutes);

// middleware for logging
const authCheck = (req, res, next) => {
    if(!req.user) {
        // User is not logged in, redirect to login
        res.redirect('/auth/login');
    } else {
        next();
    }
};

// Create home route
app.get('/',authCheck, (req,res) => {
    res.render('home', { user: req.user });
})

// Listen to port
app.listen(3234, () => {
    console.log('App now listening for requests on port 3234');
})