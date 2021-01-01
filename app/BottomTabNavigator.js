import React from 'react';
import {Text} from 'react-native';

import Home from './Screens/Home/Home';
import Members from './Screens/Members/Members';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

export default function BottomTabNavigator() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Settings" component={Members} />
    </Tab.Navigator>
  );
}
