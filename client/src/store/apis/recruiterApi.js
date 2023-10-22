import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// DEV ONLY!!!
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

const recruiterApi = createApi({
  reducerPath: 'recruiter',
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
      removeRecruiter: builder.mutation({
        invalidatesTags: (result, error, recruiter) => {
          return [{ type: 'recruiter', id: recruiter.id }];
        },
        query: (recruiter) => {
          return {
            url: `/recruiter/${recruiter.id}`,
            method: 'DELETE',
          };
        },
      }),
      addRecruiter: builder.mutation({
        invalidatesTags: (result, error, recruiter) => {
          return [{ type: 'recruiter', id: recruiter.id }];
        },
        query: (recruiter) => {
          return {
            url: '/recruiter',
            method: 'POST',
            body: recruiter,
          };
        },
      }),
      updateRecruiter: builder.mutation({
        invalidatesTags: (result, error, recruiter) => {
          return [{ type: 'recruiter', id: recruiter.id }];
        },
        query: (recruiter) => {
          return {
            url: `/recruiter/${recruiter.id}`,
            method: 'PUT',
            body: recruiter,
          };
        },
      }),
      fetchRecruiters: builder.query({
        providesTags: (result, error) => {
          const tags = result.recruiters.map((recruiter) => {
            return { type: 'recruiter', id: recruiter._id };
          });
          return tags;
        },
        query: (filter) => {
          return {
            url: '/recruiter',
            params: filter,
            method: 'GET',
          };
        },
      }),
    };
  },
});

export const {
  useFetchRecruitersQuery,
  useAddRecruiterMutation,
  useRemoveRecruiterMutation,
  useUpdateRecruiterMutation,
} = recruiterApi;
export { recruiterApi };