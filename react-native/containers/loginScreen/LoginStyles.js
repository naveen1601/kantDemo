import $_ from './LoginSettings';

export default {
    login: {
        backgroundColor: $_.loginBackgroundColor,
        flex: 1
    },
    loginInputFieldsContainer: {
        android: {
            marginBottom: $_.loginInputFieldsContainerMarginBottomAndroid
        }
    },
    loginLabel: {
        color: $_.loginLabelColor,
        paddingLeft: $_.loginLabelPaddingleft,
        fontSize: $_.loginLabelFontSize,
        lineHeight: $_.loginLabelFontSize,
        height: $_.loginLabelHeight,
        paddingTop: $_.loginLabelPaddingTop,
        fontFamily: $_.loginLabelFontfamily,
        ios: {
            fontFamily: $_.loginLabelFontfamilyIOS,
            paddingBottom: $_.loginLabelPaddingBottom
        },
        android: {
            marginBottom: 5,
        }
    },
    loginFields: {
        android: {
            marginHorizontal: -3
        }
    },
}