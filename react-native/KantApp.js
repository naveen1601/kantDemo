/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { useEffect } from 'react';
import ComponentsDemoPage from './ComponentsDemoPage';
import { getConfiguredStore, getConfiguredPersistorStore } from './Store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import SplashScreen from 'react-native-splash-screen';
import LoginOptionScreen from './containers/loginOptionScreen/LoginOptionScreen';
import KantNavigator from './kantApp/KantNavigator';

const persistor = getConfiguredPersistorStore();
const store = getConfiguredStore();


const KantApp = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  console.disableYellowBox = true;  //this is for removing yellow warnings

  return (
    <Provider store={store}>
      <PersistGate
        persistor={persistor}>
        {/* <ComponentsDemoPage/> */}
        <KantNavigator />
      </PersistGate>
    </Provider>
  );
};

export default KantApp;
