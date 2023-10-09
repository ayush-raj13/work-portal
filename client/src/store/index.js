import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { jobsApi } from './apis/jobsApi';
import { jobApplicantApi } from './apis/jobApplicantApi';
import { recruiterApi } from './apis/recruiterApi';
import { applicationApi } from './apis/applicationApi';

export const store = configureStore({
  reducer: {
    [jobsApi.reducerPath]: jobsApi.reducer,
    [jobApplicantApi.reducerPath]: jobApplicantApi.reducer,
    [applicationApi.reducerPath]: applicationApi.reducer,
    [recruiterApi.reducerPath]: recruiterApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(jobsApi.middleware)
      .concat(jobApplicantApi.middleware)
      .concat(applicationApi.middleware)
      .concat(recruiterApi.middleware)
  },
});

setupListeners(store.dispatch);

export {
  useFetchJobsQuery,
  useAddJobMutation,
  useRemoveJobMutation,
} from './apis/jobsApi';

export {
  useFetchJobApplicantsQuery,
  useAddJobApplicantMutation,
  useUpdateJobApplicantMutation,
  useRemoveJobApplicantMutation,
} from './apis/jobApplicantApi';

export {
  useFetchApplicationsQuery,
  useAddApplicationMutation,
  useUpdateApplicationMutation,
  useRemoveApplicationMutation,
} from './apis/applicationApi';

export {
  useFetchRecruitersQuery,
  useAddRecruiterMutation,
  useRemoveRecruiterMutation,
  useUpdateRecruiterMutation,
} from './apis/recruiterApi';
