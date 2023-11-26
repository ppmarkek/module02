import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiService = createApi({
  reducerPath: 'apiService',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://backend.dreamdev.lv' }),
  endpoints: (builder) => ({
    getAllRequestedResults: builder.query({
      query: ({
        searchCriteria,
        page = '1',
        size = '10',
      }: {
        searchCriteria: string;
        page?: string;
        size?: string;
      }) => `/api/${searchCriteria}/?page=${page}&size=${size}`,
    }),
    getCategories: builder.query({
      query: () => '/',
    }),
    getDetailsById: builder.query({
      query: ({ id, inputValue }: { id: string; inputValue: string }) =>
        `/api/${inputValue}/${id}`,
    }),
  }),
});

export const {
  useGetAllRequestedResultsQuery,
  useGetCategoriesQuery,
  useGetDetailsByIdQuery,
} = apiService;
