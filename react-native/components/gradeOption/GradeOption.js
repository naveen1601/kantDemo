import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../../baseComponents/button/Button'
import { View, StyleSheet } from 'react-native';
import GradeOptionStyles from './GradeOptionStyles'
import { create } from '../../helpers/PlatformSpecificStyles';
import SelectBox from '../../baseComponents/selectBox/SelectBox'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Text from '../../baseComponents/text/Text';

class GradeOption extends Component {
    state = {
        value: 0,
    };

    handleBoxSelection = (grade) => {
        this.setState({
            value : grade,
        })       
    }

    renderGradeOption = () => this.props.options.map( (item, i) => 
        (<View key={i}>
            <SelectBox
            onPress= {this.props.onSelect.bind(this,item)}
            value= {item}
            isSelected= {this.props.value == item}
            />
        </View>)      
    )
    
    render() {
        return (
            <View style={styles.gradeBoxContainer}>
                {this.renderGradeOption()}
            </View>
        );
    }
}

GradeOption.propTypes = {
    onSelect: PropTypes.func,
    options: PropTypes.array,
    value: PropTypes.string
};

let styles = create(GradeOptionStyles);

export default GradeOption;