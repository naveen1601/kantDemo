import { REHYDRATE } from 'redux-persist';
import Constants from './LeadersBoardConstants';


let initialState = {
    botsPair: [],
    evenPairDirection: true,
    isRenderedOnce: false,
    botIdPairedWithUser: 0 
};

export default function LoginReducer(state = initialState, action) {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case REHYDRATE:
            newState = action.payload && action.payload.leadersBoard ?
                Object.assign(action.payload.leadersBoard) : newState;
            break;
        case Constants.ACTIONS.SAVE_LEADERSBOARD_DATA:
            newState.botsPair= action.data.botsPair;
            newState.evenPairDirection = action.data.evenPairDirection;
            newState.botIdPairedWithUser = action.data.botIdPairedWithUser;            
            newState.isRenderedOnce= true;
            break;
        case Constants.ACTIONS.UPDATE_SCORE:
            newState.botsPair= action.data;
            break;
        case Constants.ACTIONS.CLEAR_DATA:
            newState= initialState;
            break;
        default:
            break;
    }
    return newState;
}
