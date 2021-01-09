import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import Auth from './Auth';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigation from '../../DrawerNavigation';
export default function AuthNavigation() {
  const DatabaseReducer = useSelector((state) => state.DatabaseReducer);

  console.log(DatabaseReducer.codePin);
  return (
    <View style={{flex: 1}}>
      {true ? (
        <NavigationContainer>
          <DrawerNavigation />
        </NavigationContainer>
      ) : (
        <Auth />
      )}
    </View>
  );
}
