import type { SignUpResponse, User } from '@/lib/api/auth/types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
};

const initialState: AuthState = {
  token: null,
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authSuccess: (state, action: PayloadAction<SignUpResponse>) => {
      state.user = action.payload.user ?? null;
      state.token = action.payload.token ?? null;
      state.isAuthenticated = true;
    },
    logout: state => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { authSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
