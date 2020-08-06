import $_ from './LoginOptionSettings';
import { Dimensions, Platform } from 'react-native';
const d = Dimensions.get('window');
const isX = Platform.OS === 'ios' && (d.height > 800 || d.width > 800) ? true : false;

export default {
    loginModalBackground: {
        //backgroundColor: $_.loginPageBackgroundColor,
        height: '100%'
    },
    loginContainer: {
        backgroundColor: $_.loginOptionBackgroundColor,
        position: 'absolute',
        width: '100%',
        height: '40%',
        borderTopColor: $_.loginOptionBorderColor,
        borderTopWidth: 1,
        bottom: 0,        
        // borderTopLeftRadius: 30,
        // borderTopRightRadius: 30,
        
        ios: {
            shadowColor: '#333',
            paddingBottom: isX ? 14 : 0,
            shadowOffset: {
                width: 0,
                height: 2
            },
            shadowRadius: 5,
            shadowOpacity: 1.0,
        },
    },
    login: {
        backgroundColor: $_.loginOptionBackgroundColor,
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
        paddingTop: 50
    },
}

