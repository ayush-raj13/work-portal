import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// DEV ONLY!!!
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

const jobApplicantApi = createApi({
  reducerPath: 'jobApplicant',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_SERVER_URL}/api/v1`,
    credentials: "include",
    fetchFn: async (...args) => {
      // REMOVE FOR PRODUCTION
      // await pause(3000);
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    return {
      removeJobApplicant: builder.mutation({
        invalidatesTags: (result, error, jobApplicant) => {
          return [{ type: 'jobApplicant', id: jobApplicant.id }];
        },
        query: (jobApplicant) => {
          return {
            url: `/jobapplicant/${jobApplicant.id}`,
            method: 'DELETE',
          };
        },
      }),
      addJobApplicant: builder.mutation({
        invalidatesTags: (result, error, jobApplicant) => {
          return [{ type: 'jobApplicant', id: jobApplicant.id }];
        },
        query: (jobApplicant) => {
          return {
            url: '/jobapplicant',
            method: 'POST',
            body: jobApplicant,
          };
        },
      }),
      updateJobApplicant: builder.mutation({
        invalidatesTags: (result, error, jobApplicant) => {
          return [{ type: 'jobApplicant', id: jobApplicant.id }];
        },
        query: (jobApplicant) => {
          return {
            url: `/jobapplicant/${jobApplicant.id}`,
            method: 'PUT',
            body: jobApplicant,
          };
        },
      }),
      fetchJobApplicants: builder.query({
        providesTags: (result, error) => {
          const tags = result.jobApplicants.map((applicant) => {
            return { type: 'jobApplicant', id: applicant._id };
          });
          return tags;
        },
        query: (filter) => {
          return {
            url: '/jobapplicant',
            params: {limit: 10, ...filter},
            method: 'GET',
          };
        },
      }),
    };
  },
});

export const {
  useFetchJobApplicantsQuery,
  useAddJobApplicantMutation,
  useUpdateJobApplicantMutation,
  useRemoveJobApplicantMutation,
} = jobApplicantApi;
export { jobApplicantApi };