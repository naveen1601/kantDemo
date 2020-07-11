import React, { Component } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LoginStyles, { PropStyles } from './LoginOptionStyles';
import { create } from '../../helpers/PlatformSpecificStyles';
import TextInput from '../../baseComponents/textInput/TextInput'
import Button from '../../baseComponents/button/Button'
import {
    View,
    Text,
    TouchableOpacity,
    Animated
} from 'react-native';

class LoginOptionScreen extends Component {

    

    constructor(props){
        super(props)
        this.state = {
            userName: '',
            password: '',
            animBottom: new Animated.Value(400),
        };
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

    handleUserNameChange = (text) => {
        this.setState({ userName: text });
        //this.updateLoginButtonState(text, this.state.password);
    }

    // handlePasswordChange(text) {
    //     this.setState({ password: text });
    //     this.updateLoginButtonState(this.state.userName, text);
    // }


    // renderLoginModal = () => {
    //     return (
    //         <Animated.View testID="buyTicketsButtonContainer"
    //             style={[styles.loginContainer, { transform: [{ translateY: this.state.animBottom }] }]} >
    //             <View style={styles.login}>
    //                 <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
    //                     <View style={styles.loginInputFieldsContainer}>
    //                         <Text style={styles.loginLabel}>Enter your details below</Text>
    //                         <View style={styles.loginFields}>
    //                             <TextInput
    //                                 testId="userNameTextInput"
    //                                 onChangeText={this.handleUserNameChange}
    //                                 value={this.state.userName}
    //                                 placeholder="Enter Your User Id"
    //                                 keyboardType="email-address"
    //                                 hasErrors={false}
    //                                 autoCapitalize="none"
    //                                 autoCorrect={false}
    //                             />
    //                             {/* <PasswordInput onChangeText={this.handlePasswordChange}
    //                                 testID="passwordTextInput"
    //                                 placeholder={'Password'}
    //                                 hasErrors={hasErrors}
    //                                 maxLength={Constants.PASSWORD_MAX_CHARACTERS}
    //                                 value={this.state.password}
    //                                 stacked /> */}
    //                         </View>
    //                     </View>
    //                 </KeyboardAwareScrollView>
    //             </View>
    //         </Animated.View>

    //     );
    // }

    handleLoginButton = () => this.props.navigation.navigate('LoginScreen');
    handleGuestLogin = () => this.props.navigation.navigate('GuestScreen');

    renderLoginOption = () => {
        return (
            <View>
                <View style={styles.loginModalBackground}></View>
                <Animated.View testID="buyTicketsButtonContainer"
                    style={[styles.loginContainer, { transform: [{ translateY: this.state.animBottom }] }]} >
                    <View style={styles.loginInputFieldsContainer}>
                        <View style={styles.loginFields}>
                            <Button
                                onPress={this.handleLoginButton}
                                text="Login through user id"
                                secondaryButton={true}
                            />
                            <Button
                                onPress={this.handleGuestLogin}
                                text="Login as Guest"
                                secondaryButton={true}
                            />
                        </View>
                    </View>
                </Animated.View>
            </View>)
    }

    render() {
        return this.renderLoginOption();
    }
}

LoginOptionScreen.propTypes = {
};
let styles = create(LoginStyles);

export default LoginOptionScreen;