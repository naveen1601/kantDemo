
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import SelectBoxStyles from './SelectBoxStyles';
import { create } from '../../helpers/PlatformSpecificStyles';
import Text from '../text/Text';

SelectBox = (props) => {

    let boxStyling = [styles.buttonBox];
    let textStyling = [styles.textBox];
    if(props.isSelected) {
        boxStyling.push( styles.buttonBoxSelected );
        textStyling.push( styles.textBoxSelected );
    }
    return (
        <View>
            <TouchableOpacity 
                style={boxStyling}
                onPress={props.onPress}>
                <Text  style={textStyling}>{props.value}</Text>
            </TouchableOpacity>
        </View> 
    );
}

let styles = create(SelectBoxStyles);

SelectBox.propTypes = {
    value: PropTypes.string.isRequired,
    onPress: PropTypes.func,
    isSelected: PropTypes.bool
};

export default SelectBox;