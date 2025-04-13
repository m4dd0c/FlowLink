import { PRIMARY_BE_URL, tagTypes } from "@/lib/constants";
import { ZapCreateSchema, ZapIdSchema } from "@/lib/schema/schema";
import { iFlowResponse, tUnknownObj } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { z } from "zod";

const zaps = createApi({
  reducerPath: "zaps",
  tagTypes: [tagTypes.zaps],
  baseQuery: fetchBaseQuery({
    baseUrl: new URL("/api/zaps", PRIMARY_BE_URL).toString(),
    credentials: "include",
  }),
  endpoints: (build) => ({
    // Get all zaps
    getAllZaps: build.query<iFlowResponse<tUnknownObj>, null>({
      query: () => ({
        url: "/",
      }),
      providesTags: [tagTypes.zaps],
    }),

    // Get a zap by id
    getZap: build.query<
      iFlowResponse<tUnknownObj>,
      z.infer<typeof ZapIdSchema>
    >({
      query: ({ zapId }) => ({
        url: `/${zapId}`,
      }),
      providesTags: [tagTypes.zaps],
    }),

    // Create a zap
    createZap: build.mutation<
      iFlowResponse<tUnknownObj>,
      z.infer<typeof ZapCreateSchema>
    >({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
      invalidatesTags: [tagTypes.zaps],
    }),

    // Update a zap
    deleteZap: build.mutation<
      iFlowResponse<tUnknownObj>,
      z.infer<typeof ZapIdSchema>
    >({
      query: ({ zapId }) => ({
        url: `/${zapId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.zaps],
    }),
  }),
});

export const {
  useCreateZapMutation,
  useGetAllZapsQuery,
  useGetZapQuery,
  useDeleteZapMutation,
} = zaps;
export default zaps;
