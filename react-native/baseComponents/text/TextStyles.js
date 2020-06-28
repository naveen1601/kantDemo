import $_ from './TextSettings';

let textStyles = {
    text: {
        android: {
            fontFamily: $_.textDefaultfontWeightAndroid,
        },
        ios: {
            fontFamily: $_.textDefaultfontWeightIOS
        }

    },
    textRegular: {
        android: {
            fontFamily: $_.fontWeightRegularAndroid,
        },
        ios: {
            fontFamily: $_.fontWeightRegularIOS
        }

    },
    textBold: {
        android: {
            fontFamily: $_.fontWeightBoldAndroid,
        },
        ios: {
            fontFamily: $_.fontWeightBoldIOS
        }

    },
    textError: {
        color: $_.textErrorColor
    }
};

export default textStyles;