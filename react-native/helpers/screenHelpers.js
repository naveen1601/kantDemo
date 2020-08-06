//import { NavigationActions, StackActions } from 'react-navigation';
import { StackActions } from '@react-navigation/native';

export const Screens = {
    LoginOption: 'LoginOption',
    LoginScreen: 'LoginScreen',
    GuestScreen: 'GuestScreen',
    QuizOptionScreen: 'QuizOptionScreen',
    OfflineQuizScreen: 'OfflineQuizScreen',
    LeadersBoardScreen: 'LeadersBoardScreen',
};

export const resetScreen = (navigation,screenName) => {
    navigation.reset({
    routes: [{ name: screenName }],
  });
};