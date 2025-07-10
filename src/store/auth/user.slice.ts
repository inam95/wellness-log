import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type UserState = {
  theme: 'light' | 'dark';
};

const initialState: UserState = {
  theme: 'light',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = userSlice.actions;

export default userSlice.reducer;
