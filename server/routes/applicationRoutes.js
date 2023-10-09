import express from 'express';
import { getAllApplications,
  createApplication,
  createApplications,
  getApplication,
  updateApplication,
  deleteApplication } from '../controllers/application.js';
import { ensureAuthenticated, ensureUser, ensureRecruiter } from '../controllers/authController.js';

const router = express.Router({ mergeParams: true });

router.route('/').get(ensureAuthenticated, getAllApplications).post(ensureUser, createApplication);
router.route('/multiple').post(createApplications);
router.route('/:id').get(ensureAuthenticated, getApplication).patch(ensureRecruiter, updateApplication).delete(ensureUser, deleteApplication);

export default router;
