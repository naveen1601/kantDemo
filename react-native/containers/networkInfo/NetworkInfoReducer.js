import Constants from './NetworkInfoConstants';

let initialState = {
    isConnected: true
};

export default function NetInfoReducer(state = initialState, action) {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case Constants.ACTIONS.HANDLE_CONNECTIVITY_CHANGE:
            newState.isConnected = action.isConnected;
            break;
        default:
            break;
    }
    return newState;
}
