import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
    View
} from 'react-native';
import Text from '../text/Text';
import { create } from '../../helpers/PlatformSpecificStyles';
import TextInput from '../textInput/TextInput';
import PasswordInputStyles, { PropStyles } from './PasswordInputStyles';

class PasswordInput extends Component {

    constructor(props) {
        super(props);
        this.handlePasswordVisibility = this.handlePasswordVisibility.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.state = {
            showPassword: false,
            password: null,
            isTogglePassword: false
        };
    }

    handlePasswordVisibility() {
        if (this.state.isTogglePassword) {
            this.setState({ showPassword: !this.state.showPassword });
        }
    }

    handleTextChange(text) {
        this.props.onChangeText(text);
        if (text && text.length > 0) {
            this.setState({ isTogglePassword: true });
        } else {
            this.setState({ isTogglePassword: false });
        }

    }

    render() {
        let passwordVisibiltyText = this.state.showPassword ? 'Hide' : 'Show';
        let passwordVisibiltyTextColor = this.state.isTogglePassword ? PropStyles.showPasswordColor : PropStyles.hidePasswordColor;
        return (
            <View style={styles.passwordInputWrapper}
                testID={'passwordInputComponent'}>
                <TextInput
                    style={styles.passwordTextinput}
                    secureTextEntry={!this.state.showPassword}
                    onChangeText={this.handleTextChange}
                    placeholder={this.props.placeholder}
                    hasErrors={this.props.hasErrors}
                    value={this.props.value}
                    testID={this.props.testID}
                    maxLength={this.props.maxLength}
                    stacked={this.props.stacked}
                />
                <Text onPress={this.handlePasswordVisibility}
                    testID="showOrHidePassword"
                    accessible
                    accessibilityLabel="showOrHidePassword"
                    style={[styles.togglePassword, { 'color': passwordVisibiltyTextColor }]}>
                    {passwordVisibiltyText}
                </Text>
            </View>
        );
    }
}

let styles = create(PasswordInputStyles);

PasswordInput.propTypes = {
    hasErrors: PropTypes.bool,
    isTogglePassword: PropTypes.bool,
    maxLength: PropTypes.number,
    onChangeText: PropTypes.func,
    placeholder: PropTypes.string,
    stacked: PropTypes.bool,
    testID: PropTypes.string,
    value: PropTypes.string,
};

PasswordInput.defaultProps = {
    stacked: false,
  };

export default PasswordInput;
