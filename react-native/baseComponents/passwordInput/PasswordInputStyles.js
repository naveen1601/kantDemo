import $_ from './PasswordInputSettings';

let PasswordInputStyles = {
    passwordTextinput: {
        flexDirection: 'row',
        android: {
            paddingRight: $_.passwordTextInputPaddingRightAndroid
        },
        ios: {
            paddingRight: $_.passwordTextInputPaddingRightIos
        }
    },
    togglePassword: {
        flexGrow: 8,
        alignSelf: 'center',
        textAlign: 'center',
        position: 'absolute',
        fontSize: $_.togglePasswordFontSize,
        top: $_.togglePasswordTop,
        right: $_.togglePasswordRight,
        fontFamily: $_.togglePasswordFontFamilyAndroid,
        padding: $_.togglePasswordPadding,
        ios: {
            zIndex: 1,
            fontFamily: $_.togglePasswordFontFamilyIOS,
            backgroundColor: $_.togglePasswordBackgroundColor,
        }
    }
};

export let PropStyles = {
    hidePasswordColor: $_.hidePasswordColor,
    showPasswordColor: $_.showPasswordColor
};

export default PasswordInputStyles;
