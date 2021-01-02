import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import About from './Screens/About/About';
import BottomTabNavigator from './BottomTabNavigator';
import Colors from '../theme/Colors';
import MembersArchived from './Screens/Members/MembersArchived';
import Settings from './Screens/Settings/Settings';
import Statistics from './Screens/Statistics/Statistics';

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
      <Drawer.Screen
        name="MembersArchived"
        component={MembersArchived}
        options={{title: 'Archivied memebers'}}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{title: 'Settings'}}
      />
      <Drawer.Screen name="Statistics" component={Statistics} />
      <Drawer.Screen name="About" component={About} />
    </Drawer.Navigator>
  );
}
