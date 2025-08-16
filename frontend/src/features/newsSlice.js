import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Async thunks
export const fetchTopNews = createAsyncThunk(
  'news/fetchTop',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/news/top`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const fetchAllNews = createAsyncThunk(
  'news/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/news`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const fetchNewsDetails = createAsyncThunk(
  'news/fetchDetails',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/news/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const createNews = createAsyncThunk(
  'news/create',
  async ({ title, content, imageUrl }, { getState, rejectWithValue }) => {
    try {
      const {
        user: { userInfo },
      } = getState();
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        `${API_BASE_URL}/news`,
        { title, content, imageUrl },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const updateNews = createAsyncThunk(
  'news/update',
  async ({ id, title, content, imageUrl }, { getState, rejectWithValue }) => {
    try {
      const {
        user: { userInfo },
      } = getState();
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `${API_BASE_URL}/news/${id}`,
        { title, content, imageUrl },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const deleteNews = createAsyncThunk(
  'news/delete',
  async (id, { getState, rejectWithValue }) => {
    try {
      const {
        user: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.delete(`${API_BASE_URL}/news/${id}`, config);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    topNews: [],
    allNews: [],
    newsDetails: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Top News
    builder
      .addCase(fetchTopNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopNews.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.topNews = payload;
      })
      .addCase(fetchTopNews.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    // Fetch All News
    builder
      .addCase(fetchAllNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllNews.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.allNews = payload;
      })
      .addCase(fetchAllNews.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    // Fetch News Details
    builder
      .addCase(fetchNewsDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewsDetails.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.newsDetails = payload;
      })
      .addCase(fetchNewsDetails.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    // Create News
    builder
      .addCase(createNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNews.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.allNews = [payload, ...state.allNews];
        state.topNews = [payload, ...state.topNews].slice(0, 6);
      })
      .addCase(createNews.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    // Update News
    builder
      .addCase(updateNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateNews.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.allNews = state.allNews.map((news) =>
          news._id === payload._id ? payload : news
        );
        state.topNews = state.topNews.map((news) =>
          news._id === payload._id ? payload : news
        );
        state.newsDetails = payload;
      })
      .addCase(updateNews.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    // Delete News
    builder
      .addCase(deleteNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteNews.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.allNews = state.allNews.filter((news) => news._id !== payload);
        state.topNews = state.topNews.filter((news) => news._id !== payload);
        if (state.newsDetails && state.newsDetails._id === payload) {
          state.newsDetails = null;
        }
      })
      .addCase(deleteNews.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default newsSlice.reducer;