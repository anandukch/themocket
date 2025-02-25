import { MockEndpoint } from "@/lib/constants/endpoints.constants";
import { apiWithTags } from "./baseApi";

export const mockApis = apiWithTags.injectEndpoints({
  endpoints: (builder) => ({
    createMockApi: builder.mutation({
      query: (data) => ({
        url: `/mockets`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["MOCKET_LIST"],
    }),
    getMocks: builder.query<MockEndpoint[], void>({
      query: () => ({
        url: `/mockets`,
        method: "GET",
      }),
      providesTags: ["MOCKET_LIST"],
    }),
    createMockAiApi: builder.mutation({
      query: (data) => ({
        url: `/mockets/ai`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["MOCKET_LIST"],
    }),

    getMocket: builder.query({
      query: (id: string) => ({
        url: `/mockets/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateMockAiApiMutation,
  useCreateMockApiMutation,
  useGetMocksQuery,
  useGetMocketQuery,
  useLazyGetMocketQuery,
  useLazyGetMocksQuery,
} = mockApis;
