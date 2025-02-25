import { apiWithTags } from "./baseApi";

export const authApis = apiWithTags.injectEndpoints({
  endpoints: (build) => ({
    googleAuth: build.query({
      query: () => ({
        url: `/auth/google`,
        method: "GET",
      }),
    }),

    getProfile: build.query({
      query: () => ({
        url: `/users/me`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGoogleAuthQuery,
  useLazyGoogleAuthQuery,
  useGetProfileQuery,
} = authApis;
