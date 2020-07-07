import $primary from '../../settings/styles/DefaultPrimarySettings';

let $_ = {
    hidePasswordColor: $primary.interfaceColors._3,
    showPasswordColor: $primary.secondaryColor,
    togglePasswordTop: $primary.baseGridUnit - 2,
    togglePasswordRight: ($primary.baseGridUnit * 2) + 3,
    togglePasswordPadding: $primary.baseGridUnit,
    togglePasswordBackgroundColor: $primary.interfaceColors._7,
    togglePasswordFontSize: $primary.baseFontSize + 4,
    togglePasswordFontFamilyIOS: $primary.fontFamily.medium,
    togglePasswordFontFamilyAndroid: $primary.fontFamilyAndroid.regular,
    passwordTextInputPaddingRightAndroid: $primary.baseGridUnit * 6.75,
    passwordTextInputPaddingRightIos: $primary.baseGridUnit * 6.25
};

export default $_;
