import SpinnerAction from '../spinner/SpinnerActions';
import Api from '../../helpers/Api';
import Locations from '../../helpers/Locations';
import Constants from './LoginConstants';
import UserModel from '../../models/user'

export default {
    doLogin: function (schoolCode, username, password) {

        return function (dispatch) {
            const userCredentials = { username, password, schoolCode }
            dispatch(SpinnerAction.showSpinner('Validating'));
            // dispatch(SpinnerAction.hideSpinner('Validating'));

            //dispatch({ type: Constants.ACTIONS.SHOW_LOGIN_MODAL_SPINNER });
            // let loginSuccess = (responseJson) => {
            //     dispatch({ type: Constants.ACTIONS.HIDE_LOGIN_MODAL_SPINNER });
            //     dispatch({ type: Constants.ACTIONS.LOGIN_SUCCESS });
            //     storeUserData(dispatch, responseJson, username);
            //     CredentialManagement.storeCredential(Constants.SERVER_URL, username, password);
            //     logUserId(responseJson.Customer.CustomerId);
            //     parentSuccessCallback();
            //     TrackActions.trackEvent([TuneAnalyticsEventConstants.TUNE_LOGIN]);
            // };
            // let errorCallback = (errorResponse) => {
            //     dispatch({ type: Constants.ACTIONS.HIDE_LOGIN_MODAL_SPINNER });
            //     let error = getErrorToHandle(errorResponse);
            //     if (error) {
            //         dispatch({
            //             type: Constants.ACTIONS.LOGIN_ERROR,
            //             errorMessage: error.Message,
            //             errorCode: error.Code,
            //             statusCode: errorResponse.status
            //         });
            //         TrackActions.trackErrorEvent(TrackerConstants.TRACK.LOGIN_ERROR, error.Code, error.Message);
            //     } else {
            //         dispatch({
            //             type: Constants.ACTIONS.LOGIN_ERROR,
            //             errorMessage: Constants.GENERIC_ERROR_MESSAGE,
            //             statusCode: errorResponse.status
            //         });
            //         TrackActions.trackApiErrorEvent(TrackerConstants.TRACK.LOGIN_ERROR, errorResponse);
            //     }
            // };
            let loginSuccess = (response) => {
                dispatch(SpinnerAction.hideSpinner());
                dispatch({
                    type: Constants.ACTIONS.SAVE_LOGGEDIN_USER_DATA,
                    loginUserData : new UserModel(response)
                })
                console.log('succc')
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