import SpinnerReducer from './../SpinnerReducer';

describe('Spinner reducer', () => {
    it('should set isSpinnerVisible to true and text when SHOW_SPINNER_MODAL is dispatched', () => {
        let state = SpinnerReducer({
            isSpinnerVisible: false,
            spinnerText: ''
        }, {
            type: 'SHOW_SPINNER_MODAL',
            text: 'some text'
        });

        expect(state.isSpinnerVisible).toBeTruthy();
        expect(state.spinnerText).toBe('some text');
    });

    it('should set isSpinnerVisible to true and text to empty when not passed in action SHOW_SPINNER_MODAL', () => {
        let state = SpinnerReducer({
            isSpinnerVisible: false,
            spinnerText: ''
        }, {
            type: 'SHOW_SPINNER_MODAL',
        });

        expect(state.isSpinnerVisible).toBeTruthy();
        expect(state.spinnerText).toBe('');
    });

    it('should set isSpinnerVisible to false and text to empty when HIDE_SPINNER_MODAL is dispatched', () => {
        let state = SpinnerReducer({
            isSpinnerVisible: true,
            spinnerText: ''
        }, {
            type: 'HIDE_SPINNER_MODAL',
        });

        expect(state.isSpinnerVisible).toBeFalsy();
        expect(state.spinnerText).toBe('');
    });
});