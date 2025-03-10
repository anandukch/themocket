import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
	credentials: "include",
  }),
  endpoints: () => ({}),
});

const apiWithTags = baseApi.enhanceEndpoints({
	addTagTypes: ["MOCKET_LIST","MOCKET"],
});

export { apiWithTags };
