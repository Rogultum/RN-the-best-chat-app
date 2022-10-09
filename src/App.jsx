import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

import React from 'react';
import {
  MD3DarkTheme as PaperDarkTheme,
  MD3LightTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';

import { useSelector } from 'react-redux';

import AuthStackNavigation from './navigation/AuthStackNavigation';

const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    primary: '#e2bc87',
    secondary: '#dbc1ac',
    tertiary: '#634832',
  },
};
const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
    primary: '#38220f',
    secondary: '#967259',
    tertiary: '#e2bc87',
  },
};

function App() {
  const isThemeLight = useSelector((state) => state.theme.value);

  const theme = isThemeLight ? CombinedDarkTheme : CombinedDefaultTheme;

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <AuthStackNavigation />
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
