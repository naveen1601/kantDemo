//import { NavigationActions, StackActions } from 'react-navigation';
import { StackActions } from '@react-navigation/native';

export const Screens = {
    LoginOption: 'LoginOption',
    LoginScreen: 'LoginScreen',
    GuestScreen: 'GuestScreen',
    QuizOptionScreen: 'QuizOptionScreen',
    OfflineQuizScreen: 'OfflineQuizScreen',
    LeadersBoardScreen: 'LeadersBoardScreen',
    ScheduleQuizScreen: 'ScheduleQuizScreen',
    ScheduleLeaderBoardScreen: 'ScheduleLeaderBoardScreen',
    OnlineQuizScreen: 'OnlineQuizScreen'
};

export const resetScreen = (navigation,screenName) => {
    navigation.reset({
    routes: [{ name: screenName }],
  });
};

export const navigateScreenOnError = (navigation,screenName) => {
  let routeLength = navigation.dangerouslyGetState()?.routes.length;
  if(routeLength){

    if(navigation.dangerouslyGetState()?.routes[routeLength-1]?.name != Screens.QuizOptionScreen)
      navigation.replace(screenName);
  }
};