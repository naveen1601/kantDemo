import { REHYDRATE } from 'redux-persist';
import Constants from './LoginConstants';


let initialState = {
    showLoader: false,
    isLoggedIn: false,
    isGuest: false,
    userData: {
        competencyLevel: [],
        grade: '',
        name: '',
    },
    loggedInUserData: {
        name: '',
        surName: '',
        schoolName: '',
        grade: '',
        section: '',
        competencylevel: '',
        userId: '',
        userName: '',
        token: ''
    },
    loginErrorMessage: ''

};

export default function LoginReducer(state = initialState, action) {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case REHYDRATE:
            newState = action.payload && action.payload.login ?
                Object.assign(action.payload.login, {
                    showLoader: false,
                    loginErrorMessage: ''
                }) : newState;
            break;
        case Constants.ACTIONS.SAVE_GUEST_DATA:
            newState.isGuest = true;
            newState.userData = action.userData;
            break;
        case Constants.ACTIONS.UPDATE_COMPETENCY_LEVEL:
            newState.userData.competencyLevel = action.newCompetencyLevel;
            break;
        case Constants.ACTIONS.SAVE_LOGGEDIN_USER_DATA:
            newState.userData.isGuest = false;
            newState.userData.isLoggedIn = true;
            newState.loggedInUserData = action.loginUserData;
            mewState.loginErrorMessage = '';
            break;

        case Constants.ACTIONS.LOGIN_GENERAL_ERROR:
        case Constants.ACTIONS.UNAUTHORIZED_REQUEST:
            newState.isLoggedIn = false;
            newState.loggedInUserData = initialState.loggedInUserData;
            newState.loginErrorMessage = action.message;
            break;

        case Constants.ACTIONS.RESET_ERROR_MESSAGE:
        case Constants.ACTIONS.SHOW_SPINNER_MODAL:
            newState.loginErrorMessage = '';
            break;

        default:
            break;
    }
    return newState;
}
