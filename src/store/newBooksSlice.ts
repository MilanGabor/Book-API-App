import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface Book {
  id: number;
  title: string;
  subtitle: string
  isbn13: string;
  price: string;
  image: string;
  url: string;
}

interface BooksState {
  newBooks: Book[];
  loading: boolean;
  error: string | null;
}

const initialState: BooksState = {
  newBooks: [],
  loading: false,
  error: null,
};

// Create an async thunk for fetching books
export const fetchNewBooks = createAsyncThunk('books/fetchNewBooks', async () => {
  const response = await fetch('https://api.itbook.store/1.0/new');
  if (!response.ok) {
    throw new Error('Failed to fetch books');
  }
  const data = await response.json();
  return data.books as Book[];
});

const newBooksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
        state.loading = false;
        state.newBooks = action.payload;
      })
      .addCase(fetchNewBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch books';
      });
  },
});

export default newBooksSlice.reducer;
