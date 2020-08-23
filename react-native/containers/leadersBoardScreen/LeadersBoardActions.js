
import Constants from './LeadersBoardConstants';

export default {
    saveLeadersBoard: function (leadersBoardData) {
        return function (dispatch) {
            dispatch({ 
                type: Constants.ACTIONS.SAVE_LEADERSBOARD_DATA,
                data: leadersBoardData
            });
        };
    },
    updateScore: function (leadersBoardDataWithScore) {
        return function (dispatch) {
            dispatch({ 
                type: Constants.ACTIONS.UPDATE_SCORE,
                data: leadersBoardDataWithScore
            });
        };
    },
    clearLeadersBoard: function () {
        return function (dispatch) {
            dispatch({ 
                type: Constants.ACTIONS.CLEAR_LEADERSBOARD_DATA
            });
        };
    }
}