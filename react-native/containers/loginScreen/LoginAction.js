import SpinnerAction from '../spinner/SpinnerActions';
import Api from '../../helpers/Api';
import Locations from '../../helpers/Locations';
import Constants from './LoginConstants';
import UserModel from '../../models/user';
import { Screens, resetScreen } from '../../helpers/ScreenHelpers';

export default {
    doLogin: function (schoolCode, username, password, setSponsorCallback, navigation) {

        return function (dispatch) {
            const userCredentials = { username, password, schoolCode }
            dispatch(SpinnerAction.showSpinner('Validating'));

            let loginSuccess = (response) => {
                dispatch(SpinnerAction.hideSpinner());
                const userValue = new UserModel(response)
                dispatch({
                    type: Constants.ACTIONS.SAVE_LOGGEDIN_USER_DATA,
                    loginUserData : userValue
                })
                if(!!userValue.sponsoredBy){
                    setSponsorCallback();
                    setTimeout(() => {
                        resetScreen(navigation,Screens.QuizOptionScreen);
                    }, 3000);
                }
                else resetScreen(navigation,Screens.QuizOptionScreen)
            };

            let errorCallback = (errorResponse) => {
                dispatch(SpinnerAction.hideSpinner());
                if (errorResponse.status === 401) {
                    dispatch({
                        type: Constants.ACTIONS.UNAUTHORIZED_REQUEST,
                        message: errorResponse.error.message

                    });
                }
                else {
                    dispatch({
                        type: Constants.ACTIONS.LOGIN_GENERAL_ERROR,
                        message: errorResponse.error.message
                    });
                }
            };
            Api.doPost(Locations.LOGIN, userCredentials, loginSuccess, errorCallback);
        };
    },
    resetErrorMessage: function () {
        return function (dispatch) {
            dispatch({
                type: Constants.ACTIONS.RESET_ERROR_MESSAGE,
            });
        }
    },

}