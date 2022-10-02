/* eslint-disable react/jsx-props-no-spreading */
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import React from 'react';

import Header from '../../component/Header/Header';
import ChatScreen from '../../screen/ContactStack-Chat/ChatScreen';
import BottomNavigation from '../BottomNavigation/BottomNavigation';

const Stack = createNativeStackNavigator();

const headerRender = (props) => <Header {...props} />;

function ContactStackNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => headerRender(props),
      }}
    >
      <Stack.Screen
        name="BottomNavigation"
        component={BottomNavigation}
        // options={{ header: (props) => headerRender(props) }}
      />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
}

export default ContactStackNavigation;
