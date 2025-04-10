import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PRIMARY_BE_URL, tagTypes } from "..";

const user = createApi({
  reducerPath: "user",
  tagTypes: [tagTypes.user, tagTypes.zap],
  baseQuery: fetchBaseQuery({ baseUrl: `${PRIMARY_BE_URL}/api` }),
  endpoints: (build) => ({
    login: build.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      transformResponse: (response) => {
        console.log("LOGIN", response);
      },
    }),

    signup: build.mutation({
      query: (body) => ({
        url: "/auth/signup",
        method: "POST",
        body,
      }),
      transformResponse: (response) => {
        console.log("SIGNUP", response);
      },
    }),

    me: build.query({
      query: () => ({
        url: "/auth/me",
      }),
      providesTags: [tagTypes.user],
      transformResponse: (response) => {
        console.log("ME", response);
      },
    }),

    logout: build.query({
      query: () => ({
        url: "/auth/logout",
      }),
      transformResponse: (response) => {
        console.log("LOGOUT", response);
      },
    }),
  }),
});

export const {
  useMeQuery,
  useSignupMutation,
  useLoginMutation,
  useLogoutQuery,
} = user;
export default user;
