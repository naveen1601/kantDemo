import Constants from "./ScheduleLeaderBoardConstants";
import SpinnerActions from "../spinner/SpinnerActions";
import Api from "../../helpers/Api";
import Locations from "../../helpers/Locations";
import schedule from "../../models/schedule";
import { Screens } from "../../helpers/ScreenHelpers";
import { getleaderBoardPairingMatrix } from "../../models/schedulePair";
import { nextQuizData, getCompetencyFromAttendanceAPI } from "../../helpers/CommonHelper";
import { func } from "prop-types";
import ScheduleQuizConstants from "../scheduleQuizScreen/ScheduleQuizConstants";
import LoginConstants from "../loginScreen/LoginConstants";


export default {
    stopSpinner: function () {
        return function (dispatch) {
            dispatch(SpinnerActions.hideSpinner());
        }
    },

    getLeadersBoardBeforeQuiz: function (quizId, userId, token, navigation) {

        return function (dispatch) {

            const apiParam = Locations.LEADERBOARD + quizId;
            // const apiParam = Locations.LEADERBOARD + '5f43d6111634660008074cf2';
            dispatch(SpinnerActions.showSpinner('Looking for other opponents '));

            let successCallback = (response) => {
                const pairingData = getleaderBoardPairingMatrix(response, userId);

                dispatch({
                    type: Constants.ACTIONS.UPDATE_SCHEDULE_LEADERBOARD,
                    pairingData
                });
            };

            let errorCallback = (errorResponse) => {
                if (errorResponse.status === 401) {
                    dispatch({
                        type: Constants.ACTIONS.CLEAR_DATA
                    });
                    resetScreen(navigation, Screens.LoginOption)
                }
                else {
                    dispatch({
                        type: Constants.ACTIONS.GENERAL_ERROR_LEADERBOARD,
                        message: errorResponse.error.message
                    });
                    resetScreen(navigation, Screens.ScheduleQuizScreen)
                }
            };
            Api.doGet(apiParam, { arranged: true }, successCallback, errorCallback, token);
        }
    },


    getLeadersBoardAfterQuiz: function (quizId, userId, token, navigation) {
        return function (dispatch) {

            const apiParam = Locations.LEADERBOARD + quizId;
            // const apiParam = Locations.LEADERBOARD + '5f43d6111634660008074cf2';

            let successCallback = (response) => {

                const pairingData = getleaderBoardPairingMatrix(response, userId);

                dispatch({
                    type: Constants.ACTIONS.UPDATE_SCHEDULE_LEADERBOARD,
                    pairingData
                });
            };

            let errorCallback = (errorResponse) => {
                if (errorResponse.status === 401) {
                    dispatch({
                        type: Constants.ACTIONS.CLEAR_DATA
                    });
                    resetScreen(navigation, Screens.LoginOption)
                }
                else {
                    dispatch({
                        type: Constants.ACTIONS.GENERAL_ERROR_LEADERBOARD,
                        message: errorResponse.error.message
                    });
                    resetScreen(navigation, Screens.ScheduleQuizScreen)
                }
            };
            Api.doGet(apiParam, {}, successCallback, errorCallback, token);
        }
    },

    markAttendanceForNextQuiz: function (quizScheduleList, lastQuiz, userId, token, navigation) {
        return function (dispatch) {

            
            const currentQuiz = nextQuizData(quizScheduleList, lastQuiz.outerQuizId, lastQuiz.innerQuizId)
            
            const apiParam = Locations.ATTENDANCE + currentQuiz?.innerQuizId;
            if (currentQuiz?.innerQuizId == '') {
                dispatch({
                    type: ScheduleQuizConstants.ACTIONS.UPDATE_CURRENT_QUIZ,
                    currentQuiz
                });
            }

            let successCallback = (response) => {
                const competencyLevelApi = getCompetencyFromAttendanceAPI(response, userId);
                dispatch({
                    type: LoginConstants.ACTIONS.UPDATE_COMPETENCY_LEVEL_FROM_API,
                    competencylevelFromAPI : competencyLevelApi
                })
                dispatch({
                    type: ScheduleQuizConstants.ACTIONS.UPDATE_CURRENT_QUIZ,
                    currentQuiz
                });
                //navigation.replace(Screens.ScheduleLeaderBoardScreen)
            };

            let errorCallback = (errorResponse) => {
                if (errorResponse.status === 401) {
                    dispatch({
                        type: Constants.ACTIONS.CLEAR_DATA
                    });
                    resetScreen(navigation, Screens.LoginOption)
                }
                else {
                    // dispatch({
                    //     type: Constants.ACTIONS.GENERAL_ERROR_ATTENDANCE,
                    //     message: errorResponse.error.message
                    // });
                    navigation.replace(Screens.ScheduleQuizScreen)
                }
            };
            currentQuiz.innerQuizId &&
                Api.doGet(apiParam, { attendance: true }, successCallback, errorCallback, token);
        }
    }


}