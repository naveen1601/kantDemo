import Constants from "./ScheduleQuizConstants";
import SpinnerActions from "../spinner/SpinnerActions";
import Api from "../../helpers/Api";
import Locations from "../../helpers/Locations";
import schedule from "../../models/schedule";
import { Screens } from "../../helpers/ScreenHelpers";
import ScheduleLeaderBoardConstants from "../scheduleLeaderBoardScreen/ScheduleLeaderBoardConstants";


export default {
    getQuizList: function ( token, navigation) {

        return function (dispatch) {

            dispatch(SpinnerActions.showSpinner());
            let successCallback = (response) => {
                dispatch(SpinnerActions.hideSpinner());
                dispatch({
                    type: Constants.ACTIONS.UPDATE_QUIZ_LIST,
                    scheduleQuizData: response.data.map(item => new schedule(item) )
                });
                navigation.navigate(Screens.ScheduleQuizScreen)
            };

            let errorCallback = (errorResponse) => {
                dispatch(SpinnerActions.hideSpinner());
                if (errorResponse.status === 401) {
                    dispatch({
                        type: Constants.ACTIONS.CLEAR_DATA
                    });
                    resetScreen(navigation, Screens.LOGIN_SCREEN)
                }
                else {
                    dispatch({
                        type: Constants.ACTIONS.GENERAL_ERROR_QUIZLIST,
                        message: errorResponse.error.message
                    });
                    navigation.navigate(Screens.ScheduleQuizScreen)
                }
            };

            Api.doGet(Locations.QUIZLIST, {}, successCallback, errorCallback, token);
        }
    },

    updateQuizSelection: function (outerQuizId, innerQuizId, sequence, token, navigation) {

        return function (dispatch) {

            const apiParam = Locations.ATTENDANCE + innerQuizId;
            dispatch(SpinnerActions.showSpinner('Entering in quiz'));
            dispatch({
                type: ScheduleLeaderBoardConstants.ACTIONS.CLEAR_SCHEDULE_LEADERBOARD
            });

            let successCallback = (response) => {
                dispatch({
                    type: Constants.ACTIONS.UPDATE_CURRENT_QUIZ_ID,
                    currentQuiz : {
                        outerQuizId,
                        innerQuizId,
                        sequence
                    }
                });
                navigation.navigate(Screens.ScheduleLeaderBoardScreen)
            };

            let errorCallback = (errorResponse) => {
                dispatch(SpinnerActions.hideSpinner());
                if (errorResponse.status === 401) {
                    dispatch({
                        type: Constants.ACTIONS.CLEAR_DATA
                    });
                    resetScreen(navigation, Screens.LoginOption)
                }
                else {
                    dispatch({
                        type: Constants.ACTIONS.GENERAL_ERROR_ATTENDANCE,
                        message: errorResponse.error.message
                    });
                }
            };
            Api.doGet(apiParam, {attendance:true}, successCallback, errorCallback, token);
        }
    },


}