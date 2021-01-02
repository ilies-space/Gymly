import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './Home';
import Notifications from '../Notifications/Notifications';

export default function HomeStackNavigation() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
