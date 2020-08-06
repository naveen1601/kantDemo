import React, { Component } from 'react';
import {
    StyleSheet,
    ImageBackground,
    Dimensions
} from 'react-native';

//import img from '../../staticData/assests'
let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

class BackgroundImage extends Component {

    renderBackgroundImage = () => {
        const isTablet = width > 500;
        let image = isTablet ? require('../../staticData/assests/tablet_Screen.png')
            : (height > 800) ? require('../../staticData/assests/phone_Screen.png') : require('../../staticData/assests/phone_Screen1s.png');
        return (
            <ImageBackground source={image}
                style={styles.backgroundImage}>

                {this.props.children}
            </ImageBackground>
        )
    }

    render() {
        return this.renderBackgroundImage();
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
    }
});

export default BackgroundImage;
