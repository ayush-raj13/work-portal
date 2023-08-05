import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// DEV ONLY!!!
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

const jobsApi = createApi({
  reducerPath: 'jobs',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://172.21.3.26:5000/api/v1',
    fetchFn: async (...args) => {
      // REMOVE FOR PRODUCTION
      await pause(3000);
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    return {
      removeJob: builder.mutation({
        invalidatesTags: (result, error, job) => {
          return [{ type: 'job', id: job.id }];
        },
        query: (job) => {
          return {
            url: `/jobs/${job.id}`,
            method: 'DELETE',
          };
        },
      }),
      addJob: builder.mutation({
        invalidatesTags: (result, error, job) => {
          return [{ type: 'Usersjobs', id: job.id }];
        },
        query: (job) => {
          return {
            url: '/jobs',
            method: 'POST',
            body: job,
          };
        },
      }),
      fetchJobs: builder.query({
        providesTags: (result, error) => {
          const tags = result.jobs.map((job) => {
            return { type: 'job', id: job.id };
          });
          return tags;
        },
        query: (filter) => {
          return {
            url: '/jobs',
            params: {limit: 10, ...filter},
            method: 'GET',
          };
        },
      }),
    };
  },
});

export const {
  useFetchJobsQuery,
  useAddJobMutation,
  useRemoveJobMutation,
} = jobsApi;
export { jobsApi };