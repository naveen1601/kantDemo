import { REHYDRATE } from 'redux-persist';
import Constants from './LoginConstants';


let initialState = {
    showLoader: false,
    isLoggedIn: false,
    isGuest: false,
    userData: {competencyLevel : [], grade: '', name:''}
};

export default function LoginReducer(state = initialState, action) {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case REHYDRATE:
            newState = action.payload && action.payload.login ?
                Object.assign(action.payload.login, {
                    showLoader: false
                }) : newState;
            break;
        case Constants.ACTIONS.SAVE_GUEST_DATA:
            newState.isGuest= true;
            newState.userData = action.userData;
            break;
        case Constants.ACTIONS.UPDATE_COMPETENCY_LEVEL:
            newState.userData.competencyLevel = action.newCompetencyLevel
        default:
            break;
    }
    return newState;
}
