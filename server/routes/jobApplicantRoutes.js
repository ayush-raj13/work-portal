import express from 'express';
import { getAllJobApplicants,
  createJobApplicant,
  createJobApplicants,
  getJobApplicant,
  updateJobApplicant,
  isAuthenticated } from '../controllers/jobApplicant.js';

import { ensureUser, ensureAuthenticated } from '../controllers/authController.js';

const router = express.Router({ mergeParams: true });

router.route('/').get(ensureAuthenticated, getAllJobApplicants).post(ensureUser, createJobApplicant);
router.route('/multiple').post(createJobApplicants);
router.route('/is-authenticated').get(isAuthenticated);
router.route('/:id').get(ensureAuthenticated, getJobApplicant).put(ensureUser, updateJobApplicant);

export default router;

/*
  <Route path="/search" component={Search} onEnter={requireAuth} />
  requireAuth = async (nextState, replace, next) => {
    const isAuthenticated = await axios.get(`some-url/user/is-authenticated`);
    if (!isAuthenticated) {
      replace({
        pathname: "/user-login",
        state: {nextPathname: nextState.location.pathname}
      });
    }
    next();
  }

*/
