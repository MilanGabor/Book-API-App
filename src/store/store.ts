import { configureStore } from '@reduxjs/toolkit';
import newBooksReducer from './newBooksSlice';
import booksReducer from './booksSlice';
import PaginationReducer from './PaginationSlice';
import AuthReducer from './AuthSlice';


const store = configureStore({
  reducer: {
    auth: AuthReducer,
    books: booksReducer,
    newBooks: newBooksReducer,
    pagination: PaginationReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
