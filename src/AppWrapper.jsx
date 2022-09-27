// Because we use theming in App.jsx we need to wrapp the app with redux in index.jsx
import React from 'react';

import { Provider as ReduxProvider } from 'react-redux';

import App from './App';
import { store } from './redux/store';

function AppWrapper() {
  return (
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  );
}

export default AppWrapper;
