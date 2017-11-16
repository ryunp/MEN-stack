var router = require('express').Router();
var passport = require('passport');


router.get('/', function(req, res, next) {
  res.send("User area");
});


module.exports = router;