import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  RegisterUser,
  RegisterResponse,
  LoginUser,
  User,
} from "@/types/User";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8080/api/v1/" }),
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

    loginUser: builder.mutation<User, LoginUser>({
      query: (body) => ({
        url: "user/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    getProfile: builder.query<User, void>({
      query: () => `user/profile`,
      providesTags: ["User"],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
} = userApi;
