import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const jobsApi = createApi({
  reducerPath: 'jobs',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://192.168.1.5:5000/api/v1',
    fetchFn: async (...args) => {
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
            params: filter,
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