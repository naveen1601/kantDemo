import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Text from '../../baseComponents/text/Text'

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <View>
                <Text> Login Screen </Text>
            </View>

        );
    }
}
 
export default LoginScreen;