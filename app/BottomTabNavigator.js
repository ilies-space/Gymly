import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../theme/Colors';
import MembersNavigation from './Screens/Members/MembersNavigation';
import HomeStackNavigation from './Screens/Home/HomeStackNavigation';

export default function BottomTabNavigator() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: Colors.main,
        activeBackgroundColor: Colors.dark,
        inactiveBackgroundColor: Colors.grey,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigation}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Feather name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Members"
        component={MembersNavigation}
        options={{
          tabBarLabel: 'Members',
          tabBarIcon: ({color, size}) => (
            <Feather name="users" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
