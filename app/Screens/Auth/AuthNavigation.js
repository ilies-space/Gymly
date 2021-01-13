import React from 'react';
import {Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import Auth from './Auth';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigation from '../../DrawerNavigation';
import OnboardingScreens from '../Onboarding/Onboarding';
export default function AuthNavigation() {
  const DatabaseReducer = useSelector((state) => state.DatabaseReducer);

  return (
    <View style={{flex: 1}}>
      {DatabaseReducer.AuthState ? (
        // <NavigationContainer>
        //   <DrawerNavigation />
        // </NavigationContainer>
        <View style={{flex: 1}}>
          <OnboardingScreens />
        </View>
      ) : (
        <Auth />
      )}
    </View>
  );
}
