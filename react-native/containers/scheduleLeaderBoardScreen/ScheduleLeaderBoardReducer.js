import { REHYDRATE } from 'redux-persist';
import Constants from './ScheduleLeaderBoardConstants';


let initialState = {
    pairingMatrix: [],
    errorMessage: '',
    userOponentId: ''
};


export default (state = initialState, action) => {
    let newState = Object.assign({}, state);

    switch (action.type) {
        case REHYDRATE:
            newState = action.payload && action.payload.scheduleLeaderBoard ?
                Object.assign(action.payload.scheduleLeaderBoard) : newState;
            break;

        case Constants.ACTIONS.UPDATE_SCHEDULE_LEADERBOARD:
            newState.pairingMatrix = action.pairingData.pairingMatrix;
            action.pairingData.userOponentId  != 'test' &&
                (newState.userOponentId = action.pairingData.userOponentId);
            break;
        case Constants.ACTIONS.GENERAL_ERROR_LEADERBOARD:
            newState.errorMessage = action.errorMessage;
            break;
        case Constants.ACTIONS.CLEAR_SCHEDULE_LEADERBOARD:
        case Constants.ACTIONS.CLEAR_DATA:
            newState = initialState;
            break;
        default:
            break;
    }
    return newState;
};