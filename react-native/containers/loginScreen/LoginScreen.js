import React, { Component } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LoginStyles from './LoginStyles';
import { create } from '../../helpers/PlatformSpecificStyles';
import TextInput from '../../baseComponents/textInput/TextInput'
import {
    View,
    Text
} from 'react-native';

class LoginScreen extends Component {

    state = {
        userName: '',
        password: ''
    };

    handleUserNameChange = (text) =>{
        this.setState({ userName: text });
        //this.updateLoginButtonState(text, this.state.password);
    }

    // handlePasswordChange(text) {
    //     this.setState({ password: text });
    //     this.updateLoginButtonState(this.state.userName, text);
    // }
    render() { 
        return ( 
            <View style={styles.login}>
                <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
                    <View style={styles.loginInputFieldsContainer}>
                        {/* <Text style={styles.loginLabel}>Enter your details below</Text> */}
                        <View style={styles.loginFields}>
                            <TextInput
                                testID="userNameTextInput"
                                onChangeText={this.handleUserNameChange}
                                value={this.state.userName}
                                placeholder="Enter Your User Id"
                                keyboardType="email-address"
                                hasErrors={false}
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                            {/* <PasswordInput onChangeText={this.handlePasswordChange}
                                testID="passwordTextInput"
                                placeholder={'Password'}
                                hasErrors={hasErrors}
                                maxLength={Constants.PASSWORD_MAX_CHARACTERS}
                                value={this.state.password}
                                stacked /> */}
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        );
    }
}

LoginScreen.propTypes =  {
};
let styles = create(LoginStyles);
 
export default LoginScreen;