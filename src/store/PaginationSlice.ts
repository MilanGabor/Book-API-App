import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PaginationState {
  currentPage: number;
  searchTerm: string;
}

const initialState: PaginationState = {
  currentPage: 1,
  searchTerm: '',
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
      state.currentPage = 1; // Reset to first page on new search
    },
  },
});

export const { setCurrentPage, setSearchTerm } = paginationSlice.actions;
export default paginationSlice.reducer;
