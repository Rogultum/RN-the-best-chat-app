/* eslint-disable react/jsx-props-no-spreading */
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import React from 'react';
import { useTheme } from 'react-native-paper';

import Header from '../../component/Header/Header';
import ChatScreen from '../../screen/ContactStack-Chat/ChatScreen';
import BottomNavigation from '../BottomNavigation/BottomNavigation';

const Stack = createNativeStackNavigator();

const headerRender = (props) => <Header {...props} />;

function ContactStackNavigation() {
  const { colors } = useTheme();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomNavigation"
        component={BottomNavigation}
        options={{ header: (props) => headerRender(props) }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={({ route }) => ({
          title: route.params.title,
          headerStyle: { backgroundColor: colors.primary },
        })}
      />
    </Stack.Navigator>
  );
}

export default ContactStackNavigation;
