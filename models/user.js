var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');


var User = mongoose.Schema({
  // username: String,
  firstName: String,
  lastName: String,
  email: String,
  age: Number
});

// Plugin will add: ['username', 'password', 'salt', 'hash']
User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);