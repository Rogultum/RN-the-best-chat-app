/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = true;

export const themeSlice = createSlice({
  name: 'theme',
  initialState: { initialStateValue },
  reducers: {
    changeTheme: (state) => {
      state.value = !state.value;
    },
  },
});

export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;
