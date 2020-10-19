import OnlineQuizConstants from "./OnlineQuizConstants";
import Locations from "../../helpers/Locations";
import Api from "../../helpers/Api";
import { Screens } from "../../helpers/ScreenHelpers";

export default {
    fetchOpponentScore: function (quizId, token) {
        return function (dispatch) {

            const apiParam = Locations.LEADERBOARD + quizId;

            let successCallback = (response) => {

                console.log('opp respon ',response)
                
                const opponentScore = response.counterplayer?.numberOfCorrectAnswer; //check from Prabhat
                const msg = 'opp Sco '+opponentScore;
                console.log(msg)
                // alert(msg)
                dispatch({
                    type: OnlineQuizConstants.ACTIONS.UPDATE_OPPONENT_SCORE,
                    opponentScore
                });

            };

            let errorCallback = (errorResponse) => {
                const msg = 'fetchOpponentScore '+errorResponse.error.message
                // alert(msg);
                console.log(msg)
                
                    dispatch({
                        type: OnlineQuizConstants.ACTIONS.GENERAL_ERROR_FETCH_SCORE,
                        message: errorResponse.error.message
                    });
            };
            Api.doGet(apiParam, { result: true }, successCallback, errorCallback, token);
        }
    },

    sendScoreToDB: function(score, quizId, token, navigation){

        return function (dispatch) {

            // const apiParam = Locations.LEADERBOARD + quizId;

            let successCallback = (response) => {
                //dispatch(SpinnerActions.hideSpinner());
                // const pairingData = getleaderBoardPairingMatrix(response, userId);
                console.log('score to DB Success');
                // dispatch({
                //     type: OnlineQuizConstants.ACTIONS.UPDATE_OPPONENT_SCORE,
                //     pairingData
                // });

            };

            let errorCallback = (errorResponse) => {
                const msg = 'sendScoretoDB '+errorResponse.error.message + ' ' +quizId
                // alert(msg);
                console.log(msg)

                if (errorResponse.status === 401) {
                    dispatch({
                        type: OnlineQuizConstants.ACTIONS.CLEAR_DATA
                    });
                    resetScreen(navigation, Screens.LoginOption)
                }
                else {
                    //navigation.replace(Screens.ScheduleQuizScreen); 
                }
            };
            Api.doPost(Locations.SUBMITQUIZ, { "numberOfCorrectAnswer" : score, "quiz": quizId}, successCallback, errorCallback, token);
        }
    }

}