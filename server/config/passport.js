import LocalStrategy from 'passport-local';
import User from '../models/User.js';

export default (passport) => {
  // Local Strategy for User
  passport.use('userlocal', new LocalStrategy(User.authenticate()));

  passport.serializeUser((user, cb) => {
    process.nextTick(() => {
      return cb(null, {
        id: user.id,
        username: user.username,
        picture: user.picture,
      });
    });
  });

  passport.deserializeUser((user, cb) => {
    process.nextTick(() => { return cb(null, user); });
  });
};
