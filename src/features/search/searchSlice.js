import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchSearchResult, fetchNewsResult, fetchRandom } from "./searchAPI";

const initialState = {
  keyword: "",
  result: [],
  news: [],
  latest: [],
  status: "idle",
  page: "search",
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

export const fetchNews = createAsyncThunk(
  "search/fetchNews",
  async (keyword, { dispatch, getState }) => {
    dispatch(setResult([]));
    const response = await fetchNewsResult(getState().search.keyword);
    return response.data;
  }
);

export const fetchLatest = createAsyncThunk(
  "search/fetchLatest",
  async (undefined, { dispatch, getState }) => {
    dispatch(setLatest([]));
    const response = await fetchRandom();
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
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setNews: (state, action) => {
      state.news = action.payload;
    },
    setLatest: (state, action) => {
      state.latest = action.payload;
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
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        if (action.payload.length == 0) {
          state.news = [];
        } else {
          state.news = action.payload;
        }
      })
      .addCase(fetchLatest.fulfilled, (state, action) => {
        state.latest = action.payload;
      });
  },
});

export const { setKeyword, setResult, setPage, setNews, setLatest } =
  searchSlice.actions;
export default searchSlice.reducer;

//SELECTORS
export const selectSearchResult = (state) => state.search.result;
export const selectSearchStatus = (state) => state.search.status;
export const selectKeyword = (state) => state.search.keyword;
export const selectPage = (state) => state.search.page;
export const selectNews = (state) => state.search.news;
export const selectLatest = (state) => state.search.latest;
