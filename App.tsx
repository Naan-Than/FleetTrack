import React, { useEffect } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import { Provider } from 'react-redux';
import { store, persistor } from './src/store';
import { PersistGate } from 'redux-persist/integration/react';
import Navigation from './src/navigation/Navigation';
import Toast from 'react-native-toast-message';

const App = () => {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
            <Navigation />
            <Toast />
      </PersistGate>
    </Provider>
  );
};

export default App;
