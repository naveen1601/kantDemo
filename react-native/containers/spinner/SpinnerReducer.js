import Constants from './SpinnerConstants';

let initialState = {
    isSpinnerVisible: false,
    spinnerText: ''
};

export default function SpinnerReducer(state = initialState, action) {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case Constants.ACTIONS.SHOW_SPINNER_MODAL:
            if (action.text) {
                newState.spinnerText = action.text;
            }
            newState.isSpinnerVisible = true;
            break;
            
        case Constants.ACTIONS.CLEAR_DATA:
        case Constants.ACTIONS.HIDE_SPINNER_MODAL:
            newState.isSpinnerVisible = false;
            newState.spinnerText = '';
            break;
        default:
            break;
    }
    return newState;
}
