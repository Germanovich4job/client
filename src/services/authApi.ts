import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const baseUrl = "http://localhost:5000/api"

export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Auth"],
  endpoints: builder => ({
    register: builder.mutation({
      query(body) {
        return {
          url: "/auth/register",
          method: "POST",
          body,
        }
      },
    }),

    login: builder.mutation({
      query(credentials) {
        return {
          url: "/auth/login",
          method: "POST",
          body: credentials,
        }
      },
    }),

    me: builder.query({
      query() {
        return {
          url: "/auth/me",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      },
      providesTags: ["Auth"],
    }),

    refreshTokens: builder.mutation({
      query(refreshToken) {
        return {
          url: "/auth/refresh",
          method: "POST",
          body: { refreshToken },
        }
      },
    }),
  }),
})

export const {
  useRegisterMutation,
  useLoginMutation,
  useMeQuery,
  useRefreshTokensMutation,
} = authApi
