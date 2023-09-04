import { configureStore } from '@reduxjs/toolkit';

import counterReducer, { counterSlice } from '../features/counter/counterSlice';
import { bookApi } from '../features/book-finder/book-api';
import bookReducer, { bookSlice } from '../features/book-finder/bookSlice';
import uiReducer, { uiSlice } from './uiSlice';

const store = configureStore({
  reducer: {
    [counterSlice.name]: counterReducer,
    [bookApi.reducerPath]: bookApi.reducer,
    [bookSlice.name]: bookReducer,
    [uiSlice.name]: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
