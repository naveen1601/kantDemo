import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, ViewPropTypes, TouchableHighlight, Keyboard } from 'react-native';
import { create } from '../../helpers/PlatformSpecificStyles';
import Text from '../text/Text';
import ButtonStyles, { PropStyles } from './ButtonStyles';

class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonPressed: false
        };
        this.handleOnPress = this.handleOnPress.bind(this);
    }

    handleOnPress() {
        Keyboard.dismiss();
        this.props.onPress();
    }

    render() {
        let ButtonWrapperStyles = [styles.buttonPrimaryWrapper];
        let ButtonContainerStyles = this.state.buttonPressed ? [styles.buttonPrimaryContainerPressedStyle] : [styles.buttonPrimaryContainer];
        let ButtonStyles = [styles.buttonPrimary];
        let underlayColor = PropStyles.buttonPrimaryPressedColor;

        if (this.props.secondaryButton) {
            let buttonSecondaryContainerStyles = this.state.buttonPressed ? styles.buttonSecondaryPressedStyle : styles.buttonSecondaryContainer;
            ButtonWrapperStyles.push(styles.buttonSecondaryWrapper);
            ButtonContainerStyles.push(buttonSecondaryContainerStyles);
            ButtonStyles.push(styles.buttonSecondary);
            underlayColor = PropStyles.buttonSecondaryPressedColor;
        }
        if (this.props.tertiaryButton) {
            ButtonWrapperStyles.push(styles.buttonTertiaryWrapper);
            ButtonContainerStyles.push(styles.buttonTertiaryContainer);
            ButtonStyles.push(styles.buttonTertiary);
            underlayColor = PropStyles.buttonSecondaryPressedColor;
        }
        if (this.props.quaternaryButton) {
            let buttonQuaternaryContainerStyles = this.state.buttonPressed ? styles.buttonQuaternaryPressed : styles.buttonQuaternaryContainer;
            ButtonWrapperStyles.push(styles.buttonQuaternaryWrapper);
            ButtonContainerStyles.push(buttonQuaternaryContainerStyles);
            ButtonStyles.push(styles.buttonQuaternary);
            underlayColor = PropStyles.buttonQuaternaryPressedColor;
        }
        if (this.props.disabled && (!this.props.tertiaryButton)) {
            ButtonContainerStyles.push(styles.buttonPrimaryContainerDisabled);
            ButtonStyles.push(styles.buttonPrimaryDisabled);
        }
        if (this.props.style) {
            ButtonWrapperStyles.push(this.props.style);
        }
        let buttonDisable = this.props.disabled;

        let pressHandler = this.props.onPress ? this.handleOnPress : (() => { });

        if(this.props.containerStyle){
            ButtonWrapperStyles.push(this.props.containerStyle);
        }
        return (
            <View
                style={ButtonWrapperStyles}
                accessibilityLabel={this.props.testID}>
                <TouchableHighlight style={ButtonContainerStyles}
                    onPress={() => { if (!buttonDisable) { pressHandler(); } }}
                    disabled={buttonDisable}
                    underlayColor={underlayColor}
                    onShowUnderlay={() => { this.setState({ buttonPressed: true }); }}
                    onHideUnderlay={() => { this.setState({ buttonPressed: false }); }}
                    accessibilityTraits="button"
                    accessibilityComponentType="button"
                    accessibilityLabel={this.props.text}
                    accessible
                    testID={this.props.testID}>
                    <View>
                        <Text style={[ButtonStyles,this.props.textStyle]} >
                            {this.props.text}
                        </Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

Button.propTypes = {
    containerStyle: ViewPropTypes.style,
    disabled: PropTypes.bool,
    onPress: PropTypes.func,
    quaternaryButton: PropTypes.bool,
    secondaryButton: PropTypes.bool,
    style: PropTypes.shape(),
    tertiaryButton: PropTypes.bool,
    testID: PropTypes.string,
    text: PropTypes.string,
    textStyle:PropTypes.shape()
};

let styles = create(ButtonStyles);

export default Button;
