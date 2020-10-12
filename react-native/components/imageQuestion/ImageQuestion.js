import React, { Component } from 'react';
import { Image, View } from 'react-native';
import ImageIndexing from "../../staticData/images";

class ImageQuestion extends Component {
    render() {
        return (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
                {this.props.imageName &&
                    <Image source={ImageIndexing[this.props.imageName]}
                        style={{ width: 150, height: 150, resizeMode: 'center' }}
                        resizeMode="contain" />}
            </View>
        );
    }
}

export default ImageQuestion;