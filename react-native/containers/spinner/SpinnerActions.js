import Constants from './SpinnerConstants';

export default {
    showSpinnerAction: () => {
        return Constants.ACTIONS.SHOW_SPINNER_MODAL;
    },
    hideSpinnerAction: () => {
        return Constants.ACTIONS.HIDE_SPINNER_MODAL;
    },
    showSpinner: (text) => {
        return { type: Constants.ACTIONS.SHOW_SPINNER_MODAL, text: text };
    },
    hideSpinner: () => {
        return { type: Constants.ACTIONS.HIDE_SPINNER_MODAL };
    }
};