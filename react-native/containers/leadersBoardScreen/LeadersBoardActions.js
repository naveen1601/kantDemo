
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
    clearLeadersBoard: function () {
        return function (dispatch) {
            dispatch({ 
                type: Constants.ACTIONS.CLEAR_DATA
            });
        };
    }
}