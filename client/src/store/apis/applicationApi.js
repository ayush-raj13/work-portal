import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// DEV ONLY!!!
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

const applicationApi = createApi({
  reducerPath: 'application',
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
      removeApplication: builder.mutation({
        invalidatesTags: (result, error, application) => {
          return [{ type: 'application', id: application.id }];
        },
        query: (application) => {
          return {
            url: `/applications/${application.id}`,
            method: 'DELETE',
          };
        },
      }),
      addApplication: builder.mutation({
        invalidatesTags: (result, error, application) => {
          return [{ type: 'application', id: application.id }];
        },
        query: (application) => {
          return {
            url: '/applications',
            method: 'POST',
            body: application,
          };
        },
      }),
      updateApplication: builder.mutation({
        invalidatesTags: (result, error, application) => {
          return [{ type: 'application', id: application.id }];
        },
        query: (application) => {
          return {
            url: `/application/${application.id}`,
            method: 'PUT',
            body: application,
          };
        },
      }),
      fetchApplications: builder.query({
        providesTags: (result, error) => {
          const tags = result.applications.map((application) => {
            return { type: 'application', id: application._id };
          });
          return tags;
        },
        query: (filter) => {
          return {
            url: '/applications',
            params: {limit: 10, ...filter},
            method: 'GET',
          };
        },
      }),
    };
  },
});

export const {
  useFetchApplicationsQuery,
  useAddApplicationMutation,
  useUpdateApplicationMutation,
  useRemoveApplicationMutation,
} = applicationApi;
export { applicationApi };