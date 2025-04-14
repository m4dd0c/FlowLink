import { PRIMARY_BE_URL, tagTypes } from "@/lib/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const ancillary = createApi({
  reducerPath: "ancillary",
  tagTypes: [tagTypes.triggers, tagTypes.actions],
  baseQuery: fetchBaseQuery({
    baseUrl: new URL("/api", PRIMARY_BE_URL).toString(),
    credentials: "include",
  }),
  endpoints: (builder) => ({
    // Get all triggers
    getAvailableActions: builder.query({
      query: () => "/actions",
      providesTags: [tagTypes.actions],
    }),
    // Get all actions
    getAvailableTriggers: builder.query({
      query: () => "/triggers",
      providesTags: [tagTypes.triggers],
    }),
  }),
});

export const { useGetAvailableActionsQuery, useGetAvailableTriggersQuery } =
  ancillary;
export default ancillary;
