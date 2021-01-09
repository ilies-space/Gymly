import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import store, {peristedStore} from './app/Redux/Store/store';
import AuthNavigation from './app/Screens/Auth/AuthNavigation';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={peristedStore} loading={null}>
        <AuthNavigation />
      </PersistGate>
    </Provider>
  );
}
