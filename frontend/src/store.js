import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import newsReducer from './features/newsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    news: newsReducer,
  },
});

export default store;