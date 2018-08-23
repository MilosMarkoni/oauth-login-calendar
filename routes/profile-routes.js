const router = require('express').Router();
const keys = require('../config/keys');
var gcal     = require('google-calendar');


// middleware for logging
const authCheck = (req, res, next) => {
    if(!req.user) {
        // User is not logged in, redirect to login
        res.redirect('/auth/login');
    } else {
        next();
    }
};

 // will get prefix /profile 
 router.get('/', authCheck, (req,res)=> {
   
    

    google_calendar = new gcal.GoogleCalendar(keys.session.accessTokenTemp);

    google_calendar.events.list('primary',{maxResults: '20'} ,(err, data) => {
        // console.log(data.items);
        // for (var i=0; i<17; i++) {
        //     var a = i+1;
        //     console.log('#' + a + ' ' + data.items[i].summary);
        // }
        // console.log(data.items[1].summary);
        res.render('profile',{ user: req.user, events: data.items });
    });
});

module.exports = router;