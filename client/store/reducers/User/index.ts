import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  RegisterUser,
  RegisterResponse,
  LoginUser,
  User,
  LoginResponse,
  ProfileResponse,
  LogoutResponse,
} from "@/types/User";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ 
    baseUrl: "http://localhost:8080/api/v1/",
    credentials: 'include',
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    registerUser: builder.mutation<RegisterResponse, RegisterUser>({
      query: (body) => ({
        url: "user/register",
        method: "POST",
        body,
      }),
      transformResponse: (resp: { success: string }): RegisterResponse => ({
        success: true,
        message: resp.success,
      }),
      invalidatesTags: ["User"],
    }),
    loginUser: builder.mutation<LoginResponse, LoginUser>({
      query: (body) => ({
        url: "user/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    getProfile: builder.query<ProfileResponse, void>({
      query: () => 'user/profile',
      providesTags: ["User"],
    }),

    logout: builder.query<LogoutResponse, void>({
      query: () => 'user/logout',
      providesTags: ["User"],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutQuery,
} = userApi;
