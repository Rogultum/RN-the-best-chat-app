import { createNativeStackNavigator } from '@react-navigation/native-stack';

import React from 'react';

import SettingsScreen from '../../screen/BottomNav-Settings';
import ThemeScreen from '../../screen/SettingsStack-Theme/ThemeScreen';

const Stack = createNativeStackNavigator();

function SettingsStackNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Theme" component={ThemeScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default SettingsStackNavigation;
