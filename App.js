import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigation from './app/DrawerNavigation';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import store, {peristedStore} from './app/Redux/Store/store';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={peristedStore} loading={null}>
        <NavigationContainer>
          <DrawerNavigation />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
