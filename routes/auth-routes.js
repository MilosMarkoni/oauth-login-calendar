const router = require('express').Router();
const passport = require('passport');

// all routes have auth included

// middleware for logging
const authCheck = (req, res, next) => {
    if(req.user) {
        
    } else {
        next();
    }
};

// auth login
router.get('/auth/login',authCheck, (req,res) => {
    res.render('login', { user: req.user });
});

// auth logout
router.get('/auth/logout', (req,res) => {
  
    req.logout();
    res.redirect('/auth/login');

});

// auth with google
router.get('/auth/google',
    passport.authenticate('google', {
        scope: ['profile','https://www.googleapis.com/auth/calendar','https://www.googleapis.com/auth/calendar.readonly'],
        prompt: 'select_account'
    })
);

// callback route for google to redirect to
router.get('/oauth2callback',passport.authenticate('google'),(req,res) => {
    res.redirect('/profile/');
});

module.exports = router;


