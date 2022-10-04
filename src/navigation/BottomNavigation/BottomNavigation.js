import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import React from 'react';
import { useTheme } from 'react-native-paper';

import ContactListScreen from '../../screen/BottomNav-ContactList/ContactListScreen';
import StoryScreen from '../../screen/BottomNav-Story/StoryScreen';
import SettingsStackNavigation from '../SettingsStackNavigation';

const Tab = createMaterialBottomTabNavigator();

function BottomNavigation() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator barStyle={{ backgroundColor: colors.primary }} shifting>
      <Tab.Screen
        name="ContactList"
        component={ContactListScreen}
        options={{
          tabBarIcon: 'book-open-blank-variant',
          tabBarLabel: 'Contacts',
          tabBarAccessibilityLabel: 'Bottom Tab writes Contacts',
        }}
      />
      <Tab.Screen
        name="Story"
        component={StoryScreen}
        options={{
          tabBarIcon: 'human-greeting-proximity',
          tabBarLabel: 'Share & Connect',
          tabBarAccessibilityLabel: 'Bottom Tab writes Share and Connect',
        }}
      />
      <Tab.Screen
        name="SettingsStack"
        component={SettingsStackNavigation}
        options={{
          tabBarIcon: 'account-outline',
          tabBarLabel: 'Profile',
          tabBarAccessibilityLabel: 'Bottom Tab writes Profile',
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomNavigation;
