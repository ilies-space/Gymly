import React from 'react';
import {Text, View} from 'react-native';
import BottomTabNavigator from './app/BottomTabNavigator';
import About from './app/Screens/About/About';
import Home from './app/Screens/Home/Home';
import Members from './app/Screens/Members/Members';
import Notifications from './app/Screens/Notifications/Notifications';
import Settings from './app/Screens/Settings/Settings';
import {myIcon} from './theme/Icons';
import {NavigationContainer} from '@react-navigation/native';
export default function App() {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  );
}
