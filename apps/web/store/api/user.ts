import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { z } from "zod";
import { LoginFormSchema, SignupFormSchema } from "@/lib/schema/schema";
import { iUserApiResponse, tUnknownObj } from "@/types";

export const PRIMARY_BE_URL = "http://localhost:4000";
export const WEBHOOK_BE_URL = "http://localhost:4001";

export const tagTypes = {
  user: "USER",
  zap: "ZAP",
} as const;

const user = createApi({
  reducerPath: "user",
  tagTypes: [tagTypes.user, tagTypes.zap],
  baseQuery: fetchBaseQuery({
    baseUrl: new URL("/api/user", PRIMARY_BE_URL).toString(),
    credentials: "include",
  }),
  endpoints: (build) => ({
    login: build.mutation<
      iUserApiResponse<tUnknownObj>,
      z.infer<typeof LoginFormSchema>
    >({
      query: (body) => ({
        url: "/sign-in",
        method: "POST",
        body,
      }),
    }),

    signup: build.mutation<
      iUserApiResponse<tUnknownObj>,
      z.infer<typeof SignupFormSchema>
    >({
      query: (body) => ({
        url: "/sign-up",
        method: "POST",
        body,
      }),
    }),

    me: build.query<iUserApiResponse<tUnknownObj>, null>({
      query: () => ({
        url: "/",
      }),
      providesTags: [tagTypes.user],
    }),

    logout: build.query<iUserApiResponse<tUnknownObj>, null>({
      query: () => ({
        url: "/sign-out",
      }),
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
