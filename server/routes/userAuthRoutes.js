import express from 'express';
import User from '../models/User.js';
import { signin, register, multipleRegister } from '../controllers/authController.js';

const router = express.Router({ mergeParams: true });

router.route('/register')
  .post(register);

router.route('/register/all')
  .post(multipleRegister);

router.route('/login')
  .post(signin);

router.route('/logout').get((req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.clearCookie();
    res.status(200).send({ done: true });
    return null;
  });
});

router.route('/type/:type')
  .patch((req, res) => {
    const userType = req.params.type;
    // eslint-disable-next-line no-underscore-dangle
    User.findOneAndUpdate({ _id: req.user.id }, { userType }, (err) => {
      if (err) {
        res.status(500).end(err.message);
      } else {
        res.status(200).send({ type: userType });
      }
    });
  });

router.route('/is-authenticated')
  .get((req, res) => {
    res.send(req.isAuthenticated());
  });

export default router;
