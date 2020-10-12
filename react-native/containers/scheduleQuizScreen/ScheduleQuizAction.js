import Constants from "./ScheduleQuizConstants";
import SpinnerActions from "../spinner/SpinnerActions";
import Api from "../../helpers/Api";
import Locations from "../../helpers/Locations";
import schedule from "../../models/schedule";
import { Screens, resetScreen } from "../../helpers/ScreenHelpers";
import ScheduleLeaderBoardConstants from "../scheduleLeaderBoardScreen/ScheduleLeaderBoardConstants";
import moment from "moment";
import ScheduleQuizConstants from "./ScheduleQuizConstants";
import { getCompetencyFromAttendanceAPI } from "../../helpers/CommonHelper";
import LoginConstants from "../loginScreen/LoginConstants";


export default {
    getQuizList: function (token, navigation) {

        return function (dispatch) {

            dispatch({ type: ScheduleQuizConstants.ACTIONS.CLEAR_SCHEDULE });
            dispatch(SpinnerActions.showSpinner());
            let successCallback = (response) => {
                const sortByDateValue = response.data.sort(function (a, b) {
                    const first = new Date(a.startDate);
                    const second = new Date(b.startDate);

                    if (first > second) return -1;
                    if (first < second) return 1;
                    return 0;
                });
                dispatch(SpinnerActions.hideSpinner());
                dispatch({
                    type: Constants.ACTIONS.UPDATE_QUIZ_LIST,
                    scheduleQuizData: sortByDateValue.map(item => new schedule(item))
                });
                dispatch({
                    type: Constants.ACTIONS.CLEAR_ERRORS
                });
                navigation.navigate(Screens.ScheduleQuizScreen)
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
                        type: Constants.ACTIONS.GENERAL_ERROR_QUIZLIST,
                        message: errorResponse.error.message
                    });
                    const msg = 'getList ' + errorResponse.error.message
                    alert(msg);
                    console.log(msg)

                    navigation.navigate(Screens.ScheduleQuizScreen)
                }
            };

            Api.doGet(Locations.QUIZLIST, {}, successCallback, errorCallback, token);
        }
    },

    markAttendanceOfQuiz: function (outerQuizId, innerQuizId, sequence, userId, quizData, token, navigation) {

        return function (dispatch) {

            const apiParam = Locations.ATTENDANCE + innerQuizId;
            dispatch({
                type: ScheduleLeaderBoardConstants.ACTIONS.CLEAR_SCHEDULE_LEADERBOARD
            });

            let successCallback = (response) => {
                const competencyLevelApi = getCompetencyFromAttendanceAPI(response, userId);
                dispatch({
                    type: LoginConstants.ACTIONS.UPDATE_COMPETENCY_LEVEL_FROM_API,
                    competencylevelFromAPI: competencyLevelApi
                })
                dispatch({
                    type: Constants.ACTIONS.UPDATE_CURRENT_QUIZ,
                    currentQuiz: {
                        outerQuizId,
                        innerQuizId,
                        sequence,
                        quizData
                    }
                });
                let msg = 'attn 1 ' + innerQuizId
                // alert(msg);
                console.log(msg)
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
                    dispatch({
                        type: Constants.ACTIONS.GENERAL_ERROR_ATTENDANCE,
                        message: errorResponse.error.message
                    });
                    const msg = 'markAtte ' + errorResponse.error.message
                    alert(msg);
                    console.log(msg)

                    navigation.replace(Screens.ScheduleQuizScreen);

                }
            };
            Api.doGet(apiParam, { attendance: true }, successCallback, errorCallback, token);
        }
    },

    // clearOldQuiz: function(){
    //     return function (dispatch) {

    //     }
    // }


}