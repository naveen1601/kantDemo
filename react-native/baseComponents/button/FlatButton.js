import PropTypes from 'prop-types';
import React from 'react';
import { View, TouchableOpacity, Keyboard } from 'react-native';
import { create } from '../../helpers/PlatformSpecificStyles';
import Text from '../../baseComponents/text/Text';
import ButtonStyles from './ButtonStyles';

const FlatButton = (props) => {
    const handleOnPress =()=> {
        Keyboard.dismiss();
        props.onPress();
    };
    return (
        <TouchableOpacity style={styles.flatButtonWrapper}
            onPress={handleOnPress}
            disabled={props.disabled}
            accessibilityTraits="button"
            accessibilityComponentType="button"
            accessibilityLabel={props.text}
            accessible>
            <View testID={props.testID}>
                <Text style={styles.flatButton}
                    testID={props.testID}>
                    {props.text}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = create(ButtonStyles);

FlatButton.propTypes = {
    disabled: PropTypes.bool,
    onPress: PropTypes.func,
    testID: PropTypes.string,
    text: PropTypes.string
};

export default FlatButton;