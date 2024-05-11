import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface Book {
  id: number;
  title: string;
  author: string;
  image: string;
  price: number;
}

interface BooksState {
  books: Book[];
  total: number;
  loading: boolean;
  error: string | null;
}

const initialState: BooksState = {
  books: [],
  total: 0,
  loading: false,
  error: null,
};

export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async ({ query, page }: { query: string; page: number }) => {
    const response = await fetch(`https://api.itbook.store/1.0/search/${query}/${page}`);
    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }
    const data = await response.json();
    return { books: data.books as Book[], total: data.total };
  }
);

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action: PayloadAction<{ books: Book[]; total: number }>) => {
        state.loading = false;
        state.books = action.payload.books;
        state.total = action.payload.total;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch books';
      });
  },
});

export default booksSlice.reducer;
