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
import LoginScreen from '../containers/loginScreen/LoginScreen';
import GuestScreen from '../containers/guestScreen/GuestScreen'
import QuizOptionScreen from '../containers/quizOptionScreen/QuizOptionScreen';
import OfflineQuizScreen from '../containers/offlineQuizScreen/OfflineQuizScreen';
import LeadersBoardScreen from '../containers/leadersBoardScreen/LeadersBoardScreen';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator mode='card' screenOptions={{
        gestureEnabled: false,
        headerBackTitleVisible: false
      }}>
        <Stack.Screen name="LoginOption" 
            component={LoginOptionScreen} 
            options={{ headerMode: 'none', headerShown : false}}/>

        <Stack.Screen name="LoginScreen" 
            component={LoginScreen} 
            options={{ headerTitle: 'Please Login'}}/>
            
        <Stack.Screen name="GuestScreen" 
            component={GuestScreen} 
            options={{ headerTitle: 'Guest Login Screen'}}/>

        <Stack.Screen name="QuizOptionScreen" 
            component={QuizOptionScreen} 
            options={{ title: "",}}/>
        <Stack.Screen name="OfflineQuizScreen" 
            component={OfflineQuizScreen} 
            options={{ headerShown: false}}/>
        <Stack.Screen name="LeadersBoardScreen" 
            component={LeadersBoardScreen} 
            options={{ title: "Leaders Board"}}/>
      {/* headerShown: false  // to hide header
            headerLeft: null //to hide back button*/}
      {/* <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} /> */}
    </Stack.Navigator>
  );
}

export default KantNavigator=()=> {
    return (
    <>
        <StatusBar
            barStyle="light-content"
            backgroundColor= "#255166" />
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    </>
    );
}

 