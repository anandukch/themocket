import { authApis } from "@/apis/authApi";
import { baseApi } from "@/apis/baseApi";
import { mockApis } from "@/apis/mocket";
import { createSlice } from "@reduxjs/toolkit";

interface MocketState {
  _id: string;
  requestType: string;
  endpoint: string;
  requestHeaders: string;
  requestBody: string;
  responseBody: string;
  createdBy: string;
  projectId: string;
  slugName: string;
  createdAt: string;
  updatedAt: string;
  subDomain: string;
}

interface MocketSliceState {
  mockets: MocketState[];
  loading: boolean;
}

const initialState: MocketSliceState = {
  mockets: [],
  loading: false,
};

const mocketSlice = createSlice({
  name: "mocket",
  initialState,
  reducers: {
    // setMockets(state, action) {
    //   state.mockets = action.payload;
    // },
    // setLoading(state, action) {
    //   state.loading = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      mockApis.endpoints.getMocks.matchFulfilled,
      (state, action) => {
        console.log(action.payload);

        state.mockets = action.payload;
      }
    );
    builder.addMatcher(
      mockApis.endpoints.createMockApi.matchFulfilled,
      (state, action) => {
        console.log(action.payload);
      }
    );
  },
});

export default mocketSlice.reducer;
