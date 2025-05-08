
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface FetchImageRequest {
  prompt: string;
}

export const apiSlice = createApi({
  reducerPath: 'api', 
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8888/' }), 
  endpoints: (builder) => ({
    fetchImage: builder.mutation<any, FetchImageRequest>({
      query: (request) => ({
        url: 'api/your-endpoint', 
        method: 'POST',
        body: request, 
      }),
    }),
  }),
});


export const { useFetchImageMutation } = apiSlice;
