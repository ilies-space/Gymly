import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import About from './Screens/About/About';
import BottomTabNavigator from './BottomTabNavigator';

export default function DrawerNavigation() {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator initialRouteName="BottomTabBar">
      <Drawer.Screen name="Home" component={BottomTabNavigator} />
      <Drawer.Screen name="About" component={About} />
    </Drawer.Navigator>
  );
}
