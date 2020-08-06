
import Constants from '../loginScreen/LoginConstants';

export default {
    saveGuestUser: function (userData) {
        return function (dispatch) {
            dispatch({ 
                type: Constants.ACTIONS.SAVE_GUEST_DATA,
                userData
            });
        };
    },

    updatecompetencyLevel: function (newCompetencyLevel) {
        return function (dispatch) {
            dispatch({ 
                type: Constants.ACTIONS.UPDATE_COMPETENCY_LEVEL,
                newCompetencyLevel
            });
        };
    },
}