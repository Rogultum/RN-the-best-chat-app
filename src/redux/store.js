/* eslint-disable import/prefer-default-export */
import { configureStore } from '@reduxjs/toolkit';

import contactsReducer from './slice/contactsSlice';
import locationReducer from './slice/locationSlice';
import themeReducer from './slice/themeSlice';
import userReducer from './slice/userSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
    contacts: contactsReducer,
    location: locationReducer,
  },
});
