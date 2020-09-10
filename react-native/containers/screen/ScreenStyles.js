import $_ from './ScreenSettings';

export default {
    screen : {
        flex: 1,
        backgroundColor: $_.screenBackgroundColor
    },
    scene: {
        flex: 1,
        marginTop: $_.navigationBarHeightAndroid,
        ios: {
            marginTop: $_.navigationBarHeightIOS
        }
    },
    navBarReset: {
        marginTop: 0,
    }
};