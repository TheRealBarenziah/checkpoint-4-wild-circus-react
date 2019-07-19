const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../../models').User;


const localAuthStrategy = passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
},
function(email, password, done) {
  User.findAll({where: { email: email }})
    .then((user) => {
      let reqPwd = password;
      let actualPwd = user[0].dataValues.password;
      bcrypt.compare(reqPwd, actualPwd, function(err, res) {
        if(res){
          return done(null, user[0].dataValues);
        } else {
          return done(null, false);
        }
      });
    })
    .catch(() => done(null, false));
}
));

module.exports.localAuthStrategy = localAuthStrategy;