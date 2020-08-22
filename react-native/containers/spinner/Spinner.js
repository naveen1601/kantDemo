import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
    View,
    ActivityIndicator,
    Platform
} from 'react-native';
import Text from '../../baseComponents/text/Text';
import { create } from '../../helpers/PlatformSpecificStyles';
import SpinnerStyles from './SpinnerStyles';

class Spinner extends Component {

    constructor(props) {
        super(props);
        this.renderSpinner = this.renderSpinner.bind(this);
    }

    renderSpinner() {
        return (
            <View style={styles.container}>
                <View
                    style={[
                        styles.background,
                        { backgroundColor: this.props.overlayColor }
                    ]}>
                    <ActivityIndicator
                        color={this.props.color}
                        size={this.props.size}
                    />
                    <Text style={styles.informationText}>{this.props.text}</Text>
                </View>
            </View>
        );
    }
    render() {
        if (Platform.OS === 'ios') {
            return (this.props.visible && this.renderSpinner());
        } else {
            if(this.props.visible){
                return this.renderSpinner();
            } else {
                return (<View />);
            }
        }
    }
}

let styles = create(SpinnerStyles);

const SIZES = ['small', 'normal', 'large'];

Spinner.propTypes =  {
    color: PropTypes.string,
    overlayColor: PropTypes.string,
    size: PropTypes.oneOf(SIZES),
    text: PropTypes.string,
    visible: PropTypes.bool
};

Spinner.defaultProps =  {
    visible: false,
    color: 'white',
    size: 'large',
    overlayColor: 'rgba(0, 0, 0, 0.80)',
};

export default Spinner;
