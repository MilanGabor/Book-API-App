import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isLogged: boolean;
  user: string | null;
}

const initialState: AuthState = {
  isLogged: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.isLogged = true;
      state.user = action.payload;
      localStorage.setItem('user', action.payload);
    },
    logout(state) {
      state.isLogged = false;
      state.user = null;
      localStorage.removeItem('user');
    },
    checkAuth(state) {
      const user = localStorage.getItem('user');
      if (user) {
        state.isLogged = true;
        state.user = user;
      } else {
        state.isLogged = false;
        state.user = null;
      }
    },
  },
});

export const { login, logout, checkAuth } = authSlice.actions;
export default authSlice.reducer;
