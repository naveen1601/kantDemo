import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
    View,
    ViewPropTypes,
    TextInput as ReactTextInput,
    Platform
} from 'react-native';
import { create } from '../../helpers/PlatformSpecificStyles';
import TextInputStyles, { PropStyles } from './TextInputStyles';

class TextInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isFocused: false
        };
        this.focus = this.focus.bind(this);
    }

    focus() {
        this.rntextinput && this.rntextinput.focus();
    }
    render() {
        let underlineColor, underlineWidth = 1;
        if (this.state.isFocused) {
            underlineColor = PropStyles.textInputUnderlineColorInFocus;
            underlineWidth = 2;
        } else {
            underlineColor = PropStyles.textInputUnderlineColorInblur;
        }
        let textInputContainerError = {};
        if (this.props.hasErrors) {
            underlineColor = PropStyles.textInputErrorColor;
            textInputContainerError = styles.textInputContainerError;
        }
        let textInputStyle = [styles.textInputContainer, textInputContainerError];

        if (this.props.textInputContainerStyle) {
            textInputStyle.push(this.props.textInputContainerStyle);
        }
        if (this.props.stacked) {
            textInputStyle.push(styles.stacked);
        }
        let textInputProps = {};

        if (!this.props.doNotUseValueProp)
            textInputProps.value = this.props.value;

        const reactTextInputStyles = styles.textInput;
        return (
            <View style={textInputStyle}>
                <ReactTextInput 
                    style={[reactTextInputStyles, this.props.style]}
                    allowFontScaling={false}
                    autoFocus={this.props.autoFocus}
                    returnKeyType={this.props.returnKeyType}
                    keyboardType={this.props.keyboardType}
                    {...textInputProps}
                    testID={this.props.testID}
                    ref={rntextinput => this.rntextinput = rntextinput}
                    accessible
                    accessibilityLabel={this.props.testID}
                    secureTextEntry={this.props.secureTextEntry}
                    onChangeText={this.props.onChangeText}
                    placeholder={this.props.placeholder}
                    placeholderTextColor={PropStyles.textInputPlaceholderTextColor}
                    editable={this.props.editable}
                    autoCapitalize={this.props.autoCapitalize}
                    autoCorrect={this.props.autoCorrect}
                    maxLength={this.props.maxLength}
                    onFocus={() => this.setState({ isFocused: true })}
                    onBlur={() => this.setState({ isFocused: false })}
                />
            </View>
        );
    }
}

let styles = create(TextInputStyles);

TextInput.propTypes = {
    autoCapitalize: PropTypes.string,
    autoCorrect: PropTypes.bool,
    autoFocus: PropTypes.bool,
    doNotUseValueProp: PropTypes.bool,
    editable: PropTypes.bool,
    hasErrors: PropTypes.bool,
    keyboardType: PropTypes.string,
    maxLength: PropTypes.number,
    onBlur: PropTypes.func,
    onChangeText: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    returnKeyType: PropTypes.string,
    secureTextEntry: PropTypes.bool,
    stacked: PropTypes.bool,
    style: PropTypes.oneOfType([PropTypes.shape(), PropTypes.array]),
    testID: PropTypes.string.isRequired,
    textInputContainerStyle: ViewPropTypes.style,
    value: PropTypes.string.isRequired,
};

//NOTE: doNotUseValueProp is used to not pass a value prop to textInput for secureTextEntry. This happens due to the value prop behaviour as mentioned in react native docs.

TextInput.defaultProps = {
    doNotUseValueProp: false
};

export default TextInput;
