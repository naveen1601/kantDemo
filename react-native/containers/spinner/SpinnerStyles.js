import $_ from './SpinnerSettings';

let SpinnerStyles = {
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        ios: {
            zIndex: 1
        },
        android: {
            elevation: 1
        }
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.50)'
    },
    informationText: {
        color: $_.informationTextColor
    }
};

export default SpinnerStyles;
