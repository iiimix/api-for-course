var passport = require('passport');
var config = [];
config.secret = '123456';
config.database = 'mongodb://localhost:27017/course';
config.auth = passport.authenticate('bearer', {
	session: false
})
module.exports = config;