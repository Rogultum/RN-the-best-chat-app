/* eslint-disable no-param-reassign */

/* eslint-disable import/prefer-default-export */
import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = {
  list: {
    usernname: [],
    id: [],
    photoURL: [],
  },
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { value: initialStateValue },
  reducers: {
    getContacts: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { getContacts } = contactsSlice.actions;

export default contactsSlice.reducer;
