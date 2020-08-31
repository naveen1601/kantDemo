import OnlineQuizConstants from "./OnlineQuizConstants";
import Locations from "../../helpers/Locations";
import Api from "../../helpers/Api";
import SpinnerActions from "../spinner/SpinnerActions";

export default {
    fetchOpponentScore: function (quizId, token) {
        return function (dispatch) {

            const apiParam = Locations.LEADERBOARD + quizId;

            dispatch(SpinnerActions.showSpinner('Looking for opponent\'s score '));

            let successCallback = (response) => {
                dispatch(SpinnerActions.hideSpinner());
                
                const opponentScore = response.counterplayer?.numberOfCorrectAnswer; //check from Prabhat

                dispatch({
                    type: OnlineQuizConstants.ACTIONS.UPDATE_OPPONENT_SCORE,
                    opponentScore
                });

            };

            let errorCallback = (errorResponse) => {
                dispatch(SpinnerActions.hideSpinner());
                
                    dispatch({
                        type: OnlineQuizConstants.ACTIONS.GENERAL_ERROR_FETCH_SCORE,
                        message: errorResponse.error.message
                    });
            };
            Api.doGet(apiParam, { result: true }, successCallback, errorCallback, token);
        }
    },

    sendScoreToDB: function(score, quizId, token){

        return function (dispatch) {

            // const apiParam = Locations.LEADERBOARD + quizId;

            let successCallback = (response) => {
                //dispatch(SpinnerActions.hideSpinner());
                // const pairingData = getleaderBoardPairingMatrix(response, userId);

                // dispatch({
                //     type: OnlineQuizConstants.ACTIONS.UPDATE_OPPONENT_SCORE,
                //     pairingData
                // });

            };

            let errorCallback = (errorResponse) => {
                // if (errorResponse.status === 401) {
                //     dispatch({
                //         type: Constants.ACTIONS.CLEAR_DATA
                //     });
                //     resetScreen(navigation, Screens.LoginOption)
                // }
                // else {
                //     dispatch({
                //         type: Constants.ACTIONS.GENERAL_ERROR_LEADERBOARD,
                //         message: errorResponse.error.message
                //     });
                // }
            };
            Api.doPost(Locations.SUBMITQUIZ, { "numberOfCorrectAnswer" : score, "quiz": quizId}, successCallback, errorCallback, token);
        }
    }

}