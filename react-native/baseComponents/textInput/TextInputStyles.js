import $_ from './TextInputSettings';
import { PixelRatio } from 'react-native';

let TextInputStyles = {
    textInputContainer: {
        paddingHorizontal: $_.textInputContainerPaddingHorizontal,
        borderRadius: 10,
        borderColor: $_.textBorderColor,
        borderWidth: 1,
        backgroundColor: $_.textBackgroundColor,
    },
    textInputContainerError: {
        borderColor: $_.textInputContainerErrorBorderColor,
        borderWidth: 1,
        borderRadius: $_.textBorderRadius        
    },
    textInput: {
        height: $_.textInputHeight,
        paddingRight: $_.textInputPaddingRight,
        fontSize: $_.textInputFontSize,
        color: $_.textInputColor,
        fontFamily: $_.textInputFontWeight,        
    },
    stacked: {
        borderTopWidth: 0
    }
};

export let PropStyles = {
    textInputPlaceholderTextColor: $_.textInputPlaceholderTextColor,
    textInputUnderlineColorInblur: $_.textInputUnderlineColorInblur,
    textInputErrorColor: $_.textInputErrorColor,
    textInputUnderlineColorInFocus: $_.textInputUnderlineColorInFocus
};

export default TextInputStyles;
