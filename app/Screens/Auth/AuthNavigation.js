import React from 'react';
import {Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import Auth from './Auth';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigation from '../../DrawerNavigation';
import OnboardingScreens from '../Onboarding/Onboarding';
import {createStackNavigator} from '@react-navigation/stack';

export default function AuthNavigation() {
  const DatabaseReducer = useSelector((state) => state.DatabaseReducer);
  const Stack = createStackNavigator();

  return (
    <View style={{flex: 1}}>
      {DatabaseReducer.AuthState ? (
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={
              DatabaseReducer.firstTimeUse
                ? 'OnboardingScreens'
                : 'DrawerNavigation'
            }>
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="OnboardingScreens"
              component={OnboardingScreens}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="DrawerNavigation"
              component={DrawerNavigation}
            />
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        <Auth />
      )}
    </View>
  );
}
