const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../schemas/user');

module.exports = (passport) => {
  passport.use(new LocalStrategy({
    usernameField: 'wst_id',
    passwordField: 'wst_password',
  }, async (wst_id, wst_psddword, done) => {
    try {
      const exUser = await User.findOne({ where: { wst_id } });
      if (exUser) {
        const result = await bcrypt.compare(wst_password, exUser.wst_password);
        if (result) {
          done(null, exUser);
        } else {
          done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
        }
      } else {
        done(null, false, { message: '가입되지 않은 회원입니다.' });
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};