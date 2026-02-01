import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginFormData, RegisterFormData } from "../components/auth/schema";
import { UserDTO } from "../dto";

const baseUrl = "http://localhost:5000/api";

export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Auth"],
  endpoints: builder => ({
    register: builder.mutation<UserDTO, RegisterFormData>({
      query(body) {
        return {
          url: "/auth/register",
          method: "POST",
          body,
        };
      },
    }),

    login: builder.mutation<{ accessToken: string }, LoginFormData>({
      query(credentials) {
        return {
          url: "/auth/login",
          method: "POST",
          body: credentials,
        };
      },
    }),
    refreshTokens: builder.mutation({
      query(refreshToken) {
        return {
          url: "/auth/refresh",
          method: "POST",
          body: { refreshToken },
        };
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useRefreshTokensMutation,
} = authApi;
