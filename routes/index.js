const router = require('express').Router();
const passport = require('passport');
const User = require('../models/user');


router.get('/', function(req, res, next) {
    res.render("index", { title: "Home", user: req.user });
  });


router.route("/login")
  .get(function(req, res, next) {
    res.render('login', { title: 'Login', user: req.user });
  })
  .post(passport.authenticate('local'), function(req, res) {
    // authentication was successful
    console.log(`${req.user.username} logged in.`)
    res.redirect('/');
  });


router.route('/register')
  .get(function(req, res, next) {
    res.locals.myVar = ["yes", "no", "maybe"];
    res.render('register', { title: 'Register', user: req.user });
  })
  .post(function(req, res, next) {
    User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
      if (err) {
        console.log(`error registering ${req.body.username}!`, err.message);
        return res.render('register', { error: err, title: "Register" });
      }
      console.log(`${user.username} registered.`);
      res.redirect(307, '/login');
    });
  });


router.get('/users', authedOnly, function(req, res, next) {
    User.find({}, function (err, users) {
      if (err) {
        return res.render('register', { error: err });
      }
      console.log("User List Accessed:" + typeof users);
      res.render('users', { title: 'User List', 'userlist': users, user: req.user  });
    });
  });


router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});


function authedOnly(req, res, next) {
  if (req.user) { next(); }
  else { res.redirect('/'); }
}

module.exports = router;