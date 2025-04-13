import { PRIMARY_BE_URL, tagTypes } from "@/lib/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const zaps = createApi({
  reducerPath: "zaps",
  tagTypes: [tagTypes.zaps],
  baseQuery: fetchBaseQuery({
    baseUrl: new URL("/api/zaps", PRIMARY_BE_URL).toString(),
    credentials: "include",
  }),
  endpoints: (build) => ({
    // Get all zaps
    getAllZaps: build.query({
      query: () => ({
        url: "/",
      }),
      providesTags: [tagTypes.zaps],
    }),

    // Get a zap by id
    getZap: build.query({
      query: (id) => ({
        url: `/${id}`,
      }),
      providesTags: [tagTypes.zaps],
    }),

    // Create a zap
    createZap: build.mutation({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
      invalidatesTags: [tagTypes.zaps],
    }),

    // Update a zap
    deleteZap: build.mutation({
      query: (id) => ({
        url: `/${id}`,
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
