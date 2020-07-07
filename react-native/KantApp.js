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
import LoginOptionScreen from './containers/loginOptionScreen/LoginOptionScreen';
import KantNavigator from './kantApp/KantNavigator';


const KantApp = () => {

  useEffect( () => {
    SplashScreen.hide();
  }, []);

  return (
      // <ComponentsDemoPage/>
      <KantNavigator/>
  );
};

export default KantApp;
