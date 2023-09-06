import { configureStore } from '@reduxjs/toolkit';

import counterReducer, { counterSlice } from '../features/counter/counterSlice';
import { bookApi } from '../features/book-finder/book-api';
import bookReducer, { bookSlice } from '../features/book-finder/bookSlice';
import githubReducer, { githubSlice } from '../features/github/githubSlice';
import { githubApi } from '../features/github/githubApi';
import uiReducer, { uiSlice } from './uiSlice';

const store = configureStore({
  reducer: {
    [counterSlice.name]: counterReducer,
    [bookApi.reducerPath]: bookApi.reducer,
    [bookSlice.name]: bookReducer,
    [githubApi.reducerPath]: githubApi.reducer,
    [githubSlice.name]: githubReducer,
    [uiSlice.name]: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookApi.middleware, githubApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
