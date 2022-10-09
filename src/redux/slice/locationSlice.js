/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = {
  latitude: '',
  longitude: '',
};

export const locationSlice = createSlice({
  name: 'location',
  initialState: { value: initialStateValue },
  reducers: {
    saveLocation: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { saveLocation } = locationSlice.actions;

export default locationSlice.reducer;
