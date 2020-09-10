import Constants from './NetworkInfoConstants';

export default {
    handleConnectivityChange: function (isConnected) {
        return { type: Constants.ACTIONS.HANDLE_CONNECTIVITY_CHANGE, isConnected: isConnected };
    }
};
