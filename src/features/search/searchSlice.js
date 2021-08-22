import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { counterSlice, incrementAsync } from "../counter/counterSlice";
import { fetchSearchResult } from "./searchAPI";

const initialState = {
  keyword: "",
  result: [],
  status: "idle",
};

//THUNKS
export const fetchResults = createAsyncThunk(
  "search/fetchResults",
  async (keyword, { dispatch, getState }) => {
    dispatch(setResult([]));
    const response = await fetchSearchResult(getState().search.keyword);
    return response.data;
  }
);

//SLICE
export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },
    setResult: (state, action) => {
      state.result = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResults.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchResults.fulfilled, (state, action) => {
        if (action.payload.length == 0) {
          state.status = "failed";
          state.result = [];
        } else {
          state.status = "idle";
          state.result = action.payload;
        }
      });
  },
});

export const { setKeyword, setResult } = searchSlice.actions;
export default searchSlice.reducer;

//SELECTORS
export const selectSearchResult = (state) => state.search.result;
export const selectSearchStatus = (state) => state.search.status;
export const selectKeyword = (state) => state.search.keyword;
