import Constants from "./ScheduleLeaderBoardConstants";
import SpinnerActions from "../spinner/SpinnerActions";
import Api from "../../helpers/Api";
import Locations from "../../helpers/Locations";
import schedule from "../../models/schedule";
import { Screens } from "../../helpers/ScreenHelpers";
import { getleaderBoardPairingMatrix } from "../../models/schedulePair";


export default {

    getLeadersBoardBeforeQuiz: function (quizId, userId, token, successCall, navigation) {

        return function (dispatch) {

            const apiParam = Locations.LEADERBOARD + quizId;
            // const apiParam = Locations.LEADERBOARD + '5f43d6111634660008074cf2';
            dispatch(SpinnerActions.showSpinner('Looking for other opponents '));

            let successCallback = (response) => {
                dispatch(SpinnerActions.hideSpinner());

                const pairingData= getleaderBoardPairingMatrix(response, userId);

                dispatch({
                    type: Constants.ACTIONS.UPDATE_SCHEDULE_LEADERBOARD,
                    pairingData
                });
                successCall();
                
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
                }
            };
            setTimeout(() => {
                Api.doGet(apiParam, {arranged:true}, successCallback, errorCallback, token);
            }, 10000);
            
        }
    },


    getLeadersBoardAfterQuiz: function(quizId, userId, token, successCall, navigation){

        return function (dispatch) {

            const apiParam = Locations.LEADERBOARD + quizId;
            // const apiParam = Locations.LEADERBOARD + '5f43d6111634660008074cf2';
            dispatch(SpinnerActions.showSpinner('Updating Leaderboard '));

            let successCallback = (response) => {
                dispatch(SpinnerActions.hideSpinner());

                const pairingData= getleaderBoardPairingMatrix(response, userId);

                dispatch({
                    type: Constants.ACTIONS.UPDATE_SCHEDULE_LEADERBOARD,
                    pairingData
                });
                successCall();
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
                    resetScreen(navigation, Screens.ScheduleQuizScreen)
                }
            };
            Api.doGet(apiParam, {} , successCallback, errorCallback, token);
        }

    }


}