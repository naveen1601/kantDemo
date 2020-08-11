import React, { Component } from 'react';
import { create } from '../../helpers/PlatformSpecificStyles';
import { View,Animated } from 'react-native';
import BounceButtonStyles from './BounceButtonStyles';
import Button from '../../baseComponents/button/Button';

class BounceButton extends Component {
    state = {
        animBottom: new Animated.Value(200),
    }
    componentDidMount() {
        Animated.spring(
            this.state.animBottom, {
                toValue: 0,
                useNativeDriver: true,
                delay: 1000,
                bounciness: 1
            }
        ).start();
    }
    render() {
        return (
            <Animated.View
                style={[styles.buttonContainer, { transform: [{ translateY: this.state.animBottom }] }]} >
                <Button
                    onPress={this.props.onPress}
                    text={this.props.value} />
            </Animated.View>
        );

    }
}
let styles = create(BounceButtonStyles);


export default BounceButton;