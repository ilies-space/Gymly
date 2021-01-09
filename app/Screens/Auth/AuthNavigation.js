import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import Auth from './Auth';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigation from '../../DrawerNavigation';
export default function AuthNavigation() {
  const DatabaseReducer = useSelector((state) => state.DatabaseReducer);

  return (
    <View style={{flex: 1}}>
      {DatabaseReducer.AuthState ? (
        <NavigationContainer>
          <DrawerNavigation />
        </NavigationContainer>
      ) : (
        <Auth />
      )}
    </View>
  );
}
