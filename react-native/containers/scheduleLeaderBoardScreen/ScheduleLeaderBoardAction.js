import Constants from "./ScheduleLeaderBoardConstants";
import SpinnerActions from "../spinner/SpinnerActions";
import Api from "../../helpers/Api";
import Locations from "../../helpers/Locations";
import schedule from "../../models/schedule";
import { Screens, resetScreen } from "../../helpers/ScreenHelpers";
import { getFinalleaderBoardMatrix, getleaderBoardPairingMatrix } from "../../models/schedulePair";
import { nextQuizData, getCompetencyFromAttendanceAPI } from "../../helpers/CommonHelper";
import { func } from "prop-types";
import ScheduleQuizConstants from "../scheduleQuizScreen/ScheduleQuizConstants";
import LoginConstants from "../loginScreen/LoginConstants";
import moment from 'moment';


export default {
    stopSpinner: function () {
        return function (dispatch) {
            dispatch(SpinnerActions.hideSpinner());
        }
    },

    startSpinner: function () {
        return function (dispatch) {
            dispatch(SpinnerActions.showSpinner('Looking for other opponents '));
        }
    },


    getLeadersBoardBeforeQuiz: function (currentQuiz, userId, token, navigation) {

        return function (dispatch) {

            const apiParam = Locations.LEADERBOARD + currentQuiz?.innerQuizId;
            if (currentQuiz?.innerQuizId == '') {
                dispatch({
                    type: ScheduleQuizConstants.ACTIONS.UPDATE_CURRENT_QUIZ,
                    currentQuiz
                });
            }

            let successCallback = (response) => {
                // debugger;
                console.log('Before LeaderBoard Success ');

                dispatch({
                    type: ScheduleQuizConstants.ACTIONS.UPDATE_CURRENT_QUIZ,
                    currentQuiz
                });
                const pairingData = getFinalleaderBoardMatrix(response.leaderboard_data?.initialLeaderboard, userId);

                dispatch({
                    type: Constants.ACTIONS.CLEAR_ERRORS
                });
                dispatch({
                    type: Constants.ACTIONS.UPDATE_SCHEDULE_LEADERBOARD,
                    pairingData
                });


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
                        type: Constants.ACTIONS.GENERAL_ERROR_LEADERBOARD,
                        message: errorResponse.error.message
                    });
                    const msg = 'getLeadrBeforQu ' + errorResponse.error.message
                    alert(msg);
                    console.log(msg)

                    //navigation.replace(Screens.ScheduleQuizScreen)
                }
            };
            console.log('Befor LeaderCalling ',currentQuiz.innerQuizId);

            currentQuiz.innerQuizId &&
                Api.doGet(apiParam, { arranged: true }, successCallback, errorCallback, token);
        }
    },


    getLeadersBoardAfterQuiz: function (quizId, userId, token, navigation) {
        return function (dispatch) {

            // const temp = 'afterLeadCall '+quizId
            // alert(temp);
            const apiParam = Locations.LEADERBOARD + quizId;
            // const apiParam = Locations.LEADERBOARD + '5f43d6111634660008074cf2';

            let successCallback = (response) => {
                console.log('leaderBoard After', response.leaderboard_data?.finalLeaderboard)
                const pairingData = getFinalleaderBoardMatrix(response.leaderboard_data?.finalLeaderboard, userId);

                dispatch({
                    type: Constants.ACTIONS.UPDATE_SCHEDULE_LEADERBOARD_FINAL,
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
                    const msg = 'AfterQuizError ' + errorResponse?.error?.message + ' QuizID ' + quizId
                    alert(msg);
                    console.log(msg)
                    // navigation.replace(Screens.ScheduleQuizScreen)
                }
            };
            Api.doGet(apiParam, {}, successCallback, errorCallback, token);
        }
    },

    markAttendanceForNextQuiz: function (currentQuiz, userId, token, navigation) {
        return function (dispatch) {

            const apiParam = Locations.ATTENDANCE + currentQuiz?.innerQuizId;
            // if (currentQuiz?.innerQuizId == '') {
            //     dispatch({
            //         type: ScheduleQuizConstants.ACTIONS.UPDATE_CURRENT_QUIZ,
            //         currentQuiz
            //     });
            // }

            let successCallback = (response) => {
                console.log('Nxt Atttn success ');
                const competencyLevelApi = getCompetencyFromAttendanceAPI(response, userId);
                dispatch({
                    type: LoginConstants.ACTIONS.UPDATE_COMPETENCY_LEVEL_FROM_API,
                    competencylevelFromAPI: competencyLevelApi
                })
                // dispatch({
                //     type: ScheduleQuizConstants.ACTIONS.UPDATE_CURRENT_QUIZ,
                //     currentQuiz
                // });
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
                        type: ScheduleQuizConstants.ACTIONS.GENERAL_ERROR_ATTENDANCE,
                        message: errorResponse.error.message
                    });
                    const tempVal = errorResponse.error.message + ' ' + moment.utc() + '  NxtquizTime ' + currentQuiz?.quizData?.startDate;
                    alert(tempVal);
                    console.log('Nxt Atttn error ',errorResponse.error.message);
                    navigation.replace(Screens.ScheduleQuizScreen)
                }
            };
            // const temp = 'attNextQui '+currentQuiz.innerQuizId
            // alert(temp);
            console.log('Attend for Nxt Quz ',currentQuiz.innerQuizId)
            currentQuiz.innerQuizId &&
                Api.doGet(apiParam, { attendance: true }, successCallback, errorCallback, token);
        }
    }


}