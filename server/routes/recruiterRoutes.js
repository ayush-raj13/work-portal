import express from 'express';
import { isAuthenticated,
  createRecruiter,
  createRecruiters,
  getRecruiter,
  getAllRecruiters,
  updateRecruiter } from '../controllers/recruiter.js';

import { ensureUser, ensureAuthenticated, ensureRecruiter } from '../controllers/authController.js';

const router = express.Router({ mergeParams: true });

router.route('/is-authenticated').get(isAuthenticated);
router.route('/').get(ensureAuthenticated, getAllRecruiters).post(ensureAuthenticated, createRecruiter);
router.route('/multiple').post(createRecruiters);
router.route('/:id').get(ensureUser, getRecruiter).put(ensureRecruiter, updateRecruiter);

export default router;

/*
  <Route path="/search" component={Search} onEnter={requireAuth} />
  requireAuth = async (nextState, replace, next) => {
    const isAuthenticated = await axios.get(`some-url/recruiter/is-authenticated`);
    if (!isAuthenticated) {
      replace({
        pathname: "/recruiter-login",
        state: {nextPathname: nextState.location.pathname}
      });
    }
    next();
  }

*/
