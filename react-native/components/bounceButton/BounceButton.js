import React, { Component } from 'react';
import { create } from '../../helpers/PlatformSpecificStyles';
import { Animated, View } from 'react-native';
import BounceButtonStyles from './BounceButtonStyles';
import Button from '../../baseComponents/button/Button';
import Text from '../../baseComponents/text/Text';

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

        const heightPatch = [styles.heightPatch];
        const comp = !!this.props.text ?
            (<View style={styles.sponsorContainer}>
                <Text style={styles.textStyle}>Sponsored By:</Text>
                <Text style={styles.textStyle}>{this.props.text}</Text>
            </View>) :
            (<Button
                onPress={this.props.onPress}
                text={this.props.value} />);
                
        !!this.props.text && heightPatch.push(styles.textHeightPatch);
        return (
            <View>
                <View style={heightPatch} />
                <Animated.View
                    style={[styles.buttonContainer, { transform: [{ translateY: this.state.animBottom }] }]} >
                    {comp}
                </Animated.View>
            </View>
        );

    }
}
let styles = create(BounceButtonStyles);


export default BounceButton;