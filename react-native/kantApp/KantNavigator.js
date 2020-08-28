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
import { Screens } from '../helpers/ScreenHelpers';
import AppLevelSpinner from '../kantApp/AppLevelSpinner'
import HomeButton from '../containers/homeButton/HomeButton';
import { connect } from 'react-redux';
import ScheduleQuizScreen from '../containers/scheduleQuizScreen/ScheduleQuizScreen';
import ScheduleLeaderBoardScreen from '../containers/scheduleLeaderBoardScreen/ScheduleLeaderBoardScreen';


const Stack = createStackNavigator();

quitQuizAndMoveToHome = (navigation) => (<HomeButton navigation={navigation} />);

function MyStack(props) {
    const defaultScree = props.isLoggedIn ? Screens.QuizOptionScreen : Screens.LoginOption
    return (
        <Stack.Navigator mode='card'
            initialRouteName={defaultScree}
            screenOptions={{
                gestureEnabled: false,
                headerBackTitleVisible: false
            }}>
            <Stack.Screen name={Screens.LoginOption}
                component={LoginOptionScreen}
                options={{ headerMode: 'none', headerShown: false }} />

            <Stack.Screen name={Screens.LoginScreen}
                component={LoginScreen}
                options={{ headerTitle: 'Please Login' }} />

            <Stack.Screen name={Screens.GuestScreen}
                component={GuestScreen}
                options={{ headerTitle: 'Guest Login ' }} />

            <Stack.Screen name={Screens.QuizOptionScreen}
                component={QuizOptionScreen}
                options={{ title: "Quiz Options", }} />
            <Stack.Screen name={Screens.OfflineQuizScreen}
                component={OfflineQuizScreen}
                options={({ navigation }) => {
                    return {
                        headerTitle: 'Quiz',
                        headerRight: () => quitQuizAndMoveToHome(navigation)
                    }
                }
                } />

            <Stack.Screen name={Screens.LeadersBoardScreen}
                component={LeadersBoardScreen}
                options={({ navigation }) => {
                    return {
                        headerTitle: 'Leaderboard',
                        headerRight: () => quitQuizAndMoveToHome(navigation)
                    }
                }
                } />

            <Stack.Screen name={Screens.ScheduleQuizScreen}
                component={ScheduleQuizScreen}
                options={{ headerTitle: 'Schedule Quiz' }} />

            <Stack.Screen name={Screens.ScheduleLeaderBoardScreen}
                component={ScheduleLeaderBoardScreen}
                options={{ headerTitle: 'Leaderboard' }} />

            {/* headerShown: false  // to hide header
            headerLeft: null //to hide back button
            
            //Imp for navigation in header
            options={({ navigation }) => { 
                return{
                    headerTitle: 'login Option',
                    headerRight: () => (
                        <FlatButton
                          onPress={() => resetScreen(navigation,Screens.GuestScreen)}
                          text="Info"
                        />)
                }}
                }
            //change option/header from comp
            this.props.navigation.setParams({
                headerRight: () => (
                        <FlatButton
                          onPress={() => resetScreen(this.props.navigation,Screens.GuestScreen)}
                          text="Info"
                        />)
            });
            
            */}
        </Stack.Navigator>
    );
}

const mapStateToProps = state => ({
    isLoggedIn: state.login.isLoggedIn,
});

StackNav = connect(mapStateToProps)(MyStack)

export default KantNavigator = () => {
    return (
        <>
            <StatusBar
                barStyle="light-content"
                backgroundColor="#255166" />
            <NavigationContainer>
                <StackNav />
            </NavigationContainer>
            <AppLevelSpinner />
        </>
    );
}
