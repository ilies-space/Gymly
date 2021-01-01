import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import About from './Screens/About/About';
import BottomTabNavigator from './BottomTabNavigator';
import Colors from '../theme/Colors';

export default function DrawerNavigation() {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      drawerStyle={{backgroundColor: Colors.dark}}
      initialRouteName="BottomTabBar"
      drawerContentOptions={{
        activeBackgroundColor: Colors.grey,
        activeTintColor: Colors.main,
        inactiveBackgroundColor: Colors.dark,
        inactiveTintColor: Colors.lightGrey,
      }}>
      <Drawer.Screen name="Home" component={BottomTabNavigator} />
      <Drawer.Screen name="About" component={About} />
    </Drawer.Navigator>
  );
}
