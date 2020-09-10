import $_ from './NetworkInfoSettings';

export let PropStyles = {
};

export default {
    offlineContainer: {
        ios: {
            bottom: 0,
            zIndex: 1
        },
        android: {
            bottom: 0,
            elevation: 1
        },
        left: 0,
        right: 0,
        position: 'absolute',
    },
    offline: {
        backgroundColor: $_.offlineBackgroundColor,
        height: 42,
        flex: 1,
        justifyContent: 'center'
    },
    offlineText: {
        color: $_.offlineTextColor,
        textAlign: 'center',
        fontStyle: 'italic'
    }
};
