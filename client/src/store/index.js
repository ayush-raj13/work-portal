import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { jobsApi } from './apis/jobsApi';
import { jobApplicantApi } from './apis/jobApplicantApi';

export const store = configureStore({
  reducer: {
    [jobsApi.reducerPath]: jobsApi.reducer,
    [jobApplicantApi.reducerPath]: jobApplicantApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(jobsApi.middleware)
      .concat(jobApplicantApi.middleware)
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
  useRemoveJobApplicantMutation,
} from './apis/jobApplicantApi';
