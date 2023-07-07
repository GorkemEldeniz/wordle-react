import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: 'user',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  endpoints: (builder) => ({
    getAllUser: builder.query<any, string>({
      query: () => `/`,
    }),
    register: builder.mutation({
      query:(user) => ({
        method:'POST',
        body:user,
        url :'/create'
      }),
    }),
    login: builder.mutation({
      query:(user) => ({
        method:'POST',
        body:user,
        url :'/login'
      }),
    })
  }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetAllUserQuery,useRegisterMutation,useLoginMutation } = userApi