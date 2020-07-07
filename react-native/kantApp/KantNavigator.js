import React from 'react';

import {
    Image,
    StyleSheet,
    StatusBar,    
    View
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderBackground } from '@react-navigation/stack';
import LoginOptionScreen from '../containers/loginOptionScreen/LoginOptionScreen';
import FlatButton from '../baseComponents/button/FlatButton'

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LoginOption" 
            component={LoginOptionScreen} 
            options={{ headerMode: 'none', headerShown : false}}/>
      {/* <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} /> */}
    </Stack.Navigator>
  );
}

export default KantNavigator=()=> {
    return (
    <>
        <StatusBar
            barStyle="light-content"
            backgroundColor="#255166" />
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    </>
    );
  }

  const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: "#000000",
    },
});

 