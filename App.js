import React from 'react';
import {Text, View} from 'react-native';
import About from './app/Screens/About/About';
import Home from './app/Screens/Home/Home';
import Members from './app/Screens/Members/Members';
import Notifications from './app/Screens/Notifications/Notifications';
import Settings from './app/Screens/Settings/Settings';

export default function App() {
  return (
    <View>
      <Text>Hello WORLD from , @ilies.space</Text>
      <Home />
      <Members />
      <Notifications />
      <Settings />
      <About />
    </View>
  );
}
