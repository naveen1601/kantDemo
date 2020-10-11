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
        surName: '',
        schoolName: '',
        section: '',
        rollNumber: 0,
        competencylevelFromAPI: 0,
        userId: '',
        userName: '',
        token: '',
        sponsoredBy:'',
        schoolCode: '',
        competencyLevelVirtual: []

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
        case Constants.ACTIONS.UPDATE_VIRTUAL_COMPETENCY_LEVEL:
            newState.userData.competencyLevelVirtual = action.newVirtualCompetencyLevel;
            break;
        case Constants.ACTIONS.SAVE_LOGGEDIN_USER_DATA:
            newState.isGuest = false;
            newState.isLoggedIn = true;
            newState.isGuest = false;
            newState.userData = action.loginUserData;
            newState.loginErrorMessage = '';
            break;

        case Constants.ACTIONS.UPDATE_COMPETENCY_LEVEL_FROM_API:
            newState.userData.competencylevelFromAPI = action.competencylevelFromAPI;
            break;

        case Constants.ACTIONS.LOGIN_GENERAL_ERROR:
        case Constants.ACTIONS.UNAUTHORIZED_REQUEST:
            newState.isLoggedIn = false;
            newState.userData = initialState.userData;
            newState.loginErrorMessage = action.message;
            break;
        case Constants.ACTIONS.RESET_ERROR_MESSAGE:
        case Constants.ACTIONS.SHOW_SPINNER_MODAL:
            newState.loginErrorMessage = '';
            break;
            
        case Constants.ACTIONS.CLEAR_DATA:
            newState = initialState;
            break;

        default:
            break;
    }
    return newState;
}
