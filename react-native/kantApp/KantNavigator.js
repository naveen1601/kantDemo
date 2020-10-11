import React, { useEffect, createRef } from "react";
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
import { Screens, resetScreen } from '../helpers/ScreenHelpers';
import AppLevelSpinner from '../kantApp/AppLevelSpinner'
import HomeButton from '../containers/homeButton/HomeButton';
import { connect } from 'react-redux';
import ScheduleQuizScreen from '../containers/scheduleQuizScreen/ScheduleQuizScreen';
import ScheduleLeaderBoardScreen from '../containers/scheduleLeaderBoardScreen/ScheduleLeaderBoardScreen';
import OnlineQuizScreen from '../containers/onlineQuizScreen/OnlineQuizScreen';
import FlatButton from '../baseComponents/button/FlatButton';
import { AppState } from 'react-native';


const Stack = createStackNavigator();
const navigationRef = createRef();

quitQuizAndMoveToHome = (navigation) => (<HomeButton navigation={navigation} />);

function MyStack(props) {
    const defaultScreen = props.isLoggedIn ? Screens.QuizOptionScreen : Screens.LoginOption


    performLogout = navigation => {
        const comp = props.isLoggedIn ? (<FlatButton
            onPress={() => {
                props.clearAll();
                resetScreen(navigation, Screens.LoginOption)
            }}
            text={'Logout'}
        />) : null
        return comp;
    }

    return (
        <Stack.Navigator mode='card'
            initialRouteName={defaultScreen}
            screenOptions={{
                gestureEnabled: false,
                headerBackTitleVisible: false
            }}>
            <Stack.Screen name={Screens.LoginOption}
                component={LoginOptionScreen}
                options={{ headerMode: 'none', headerShown: false }} />

            <Stack.Screen name={Screens.LoginScreen}
                component={LoginScreen}
                options={{ headerTitle: 'Student Login' }} />

            <Stack.Screen name={Screens.GuestScreen}
                component={GuestScreen}
                options={{ headerTitle: 'Guest Login ' }} />

            <Stack.Screen name={Screens.QuizOptionScreen}
                component={QuizOptionScreen}
                options={({ navigation }) => {
                    return {
                        headerTitle: 'Quiz Options',
                        headerRight: () => performLogout(navigation)
                    }
                }} />
            <Stack.Screen name={Screens.OfflineQuizScreen}
                component={OfflineQuizScreen}
                options={({ navigation }) => {
                    return {
                        headerTitle: 'Quiz',
                        headerRight: () => quitQuizAndMoveToHome(navigation)
                    }
                }} />

            <Stack.Screen name={Screens.LeadersBoardScreen}
                component={LeadersBoardScreen}
                options={({ navigation }) => {
                    return {
                        headerTitle: 'Leaderboard',
                        headerRight: () => quitQuizAndMoveToHome(navigation)
                    }
                }} />

            <Stack.Screen name={Screens.ScheduleQuizScreen}
                component={ScheduleQuizScreen}
                options={{ headerTitle: 'Schedule Quiz' }} />

            <Stack.Screen name={Screens.ScheduleLeaderBoardScreen}
                component={ScheduleLeaderBoardScreen}
                options={({ navigation }) => {
                    return {
                        headerTitle: 'Leaderboard',
                        // headerLeft: null,
                        headerRight: () => quitQuizAndMoveToHome(navigation)
                    }
                }} />

            <Stack.Screen name={Screens.OnlineQuizScreen}
                component={OnlineQuizScreen}
                options={({ navigation }) => {
                    return {
                        headerTitle: 'Quiz',
                        // headerLeft: null,
                        headerRight: () => quitQuizAndMoveToHome(navigation)
                    }
                }} />
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

const mapDispatchToProps = dispatch => {
    return {
        clearAll: () => {
            dispatch({ type: 'CLEAR_DATA' })
        }
    }
}

StackNav = connect(mapStateToProps, mapDispatchToProps)(MyStack)

export default KantNavigator = () => {

    useEffect(() => {
        AppState.addEventListener("change", _handleAppStateChange);

        return () => {
            AppState.removeEventListener("change", _handleAppStateChange);
        };
    }, []);

    const _handleAppStateChange = (nextAppState) => {
        if (nextAppState == "active") {
            console.log("App has come to the foreground!");
            

        }
        else if (nextAppState == "background") {
            
            console.log("App is in  backGround!");
            navigationRef.current.canGoBack() &&
                navigationRef.current.goBack()
        }
        else {
            console.log("App is in else State");
        }
    };

    return (
        <>
            <StatusBar
                barStyle="light-content"
                backgroundColor="#255166" />
            <NavigationContainer ref={navigationRef}>
                <StackNav />
            </NavigationContainer>
            <AppLevelSpinner />
        </>
    );
}
