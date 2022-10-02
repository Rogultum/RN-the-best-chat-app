import { createNativeStackNavigator } from '@react-navigation/native-stack';

import React from 'react';
import { useTheme } from 'react-native-paper';

import SignInScreen from '../../screen/AuthNav-SignIn/SignInScreen';
import SignUpScreen from '../../screen/AuthNav-SignUp/SignUpScreen';
import ContactStackNavigation from '../ContactStackNavigation';

const Stack = createNativeStackNavigator();

function ChatStackNavigation() {
  const { colors } = useTheme();

  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: colors.primary } }}>
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen
        name="ContactStack"
        component={ContactStackNavigation}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default ChatStackNavigation;
