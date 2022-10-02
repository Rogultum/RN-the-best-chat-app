/* eslint-disable no-param-reassign */

/* eslint-disable import/prefer-default-export */
import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = {
  email: '',
  id: '',
  location: [],
  photoURL: '',
  username: '',
  password: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState: { value: initialStateValue },
  reducers: {
    signIn: (state, action) => {
      state.value = action.payload;
    },
    updateUser: (state, action) => {
      state.value = {
        ...state.value,
        ...action.payload,
      };
    },
    addLocationUser: (state, action) => {
      state.value.location = action.payload;
    },
    logout: (state) => {
      state.value = initialStateValue;
    },
    setSignUpForm: (state, action) => {
      state.value.email = action.payload.email;
      state.value.password = action.payload.password;
      state.value.username = action.payload.username;
    },
  },
});

export const { signIn, updateUser, logout, setSignUpForm, addLocationUser } = userSlice.actions;

export default userSlice.reducer;
