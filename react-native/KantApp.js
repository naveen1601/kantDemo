/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {useEffect} from 'react';
import ComponentsDemoPage from './ComponentsDemoPage';
import SplashScreen from 'react-native-splash-screen';
import LoginScreen from './containers/loginScreen/LoginScreen'


const KantApp = () => {

  useEffect( () => {
    SplashScreen.hide();
  }, []);

  return (
      // <ComponentsDemoPage/>
      <LoginScreen/>
  );
};

export default KantApp;
