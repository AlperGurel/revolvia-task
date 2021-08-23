import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchSearchResult,
  fetchRandom,
  fetchSingleNew,
  fetchResult,
} from "./searchAPI";

const initialState = {
  keyword: "",
  result: [],
  news: [],
  latest: [],
  status: "idle",
  page: "search",
  filter: {
    direct: "",
    category: "",
    editor: "",
    keyword: "",
  },
  order: "latest",
};

//THUNKS
export const setSingleNewById = createAsyncThunk(
  "search/fetchSingle",
  async (id, { dispatch, getState }) => {
    dispatch(setNews([]));
    const response = await fetchSingleNew(id);
    return response.data;
  }
);

export const fetchResults = createAsyncThunk(
  "search/fetchResults",
  async (keyword, { dispatch, getState }) => {
    dispatch(setResult([]));
    const response = await fetchSearchResult(getState().search.filter.keyword);
    return response.data;
  }
);

export const fetchNews = createAsyncThunk(
  "search/fetchNews",
  async (none, { dispatch, getState }) => {
    // dispatch(setResult([]));
    const response = await fetchResult(
      getState().search.filter,
      getState().search.order
    );
    return response.data;
  }
);

export const fetchLatest = createAsyncThunk(
  "search/fetchLatest",
  async (none, { dispatch, getState }) => {
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
      state.filter.keyword = action.payload;
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
    setFilterDirect: (state, action) => {
      state.filter.keyword = "";
      state.filter.direct = action.payload;
    },
    setFilterEditor: (state, action) => {
      state.filter.keyword = "";
      state.filter.editor = action.payload;
    },
    setFilterCategory: (state, action) => {
      state.filter.keyword = "";
      state.filter.category = action.payload;
    },
    setNewsOrder: (state, action) => {
      state.order = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResults.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchResults.fulfilled, (state, action) => {
        if (action.payload.length === 0) {
          state.status = "failed";
          state.result = [];
        } else {
          state.status = "idle";
          state.result = action.payload;
        }
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.news = action.payload;
      })
      .addCase(fetchLatest.fulfilled, (state, action) => {
        state.latest = action.payload;
      })
      .addCase(setSingleNewById.fulfilled, (state, action) => {
        state.news = action.payload;
      });
  },
});

export const {
  setKeyword,
  setResult,
  setPage,
  setNews,
  setLatest,
  setFilterDirect,
  setFilterEditor,
  setFilterCategory,
  setNewsOrder,
} = searchSlice.actions;
export default searchSlice.reducer;

//SELECTORS
export const selectSearchResult = (state) => state.search.result;
export const selectSearchStatus = (state) => state.search.status;
export const selectKeyword = (state) => state.search.filter.keyword;
export const selectPage = (state) => state.search.page;
export const selectNews = (state) => state.search.news;
export const selectLatest = (state) => state.search.latest;
export const selectFilter = (state) => state.search.filter;
export const selectOrder = (state) => state.search.order;
