import React, { Component } from 'react';
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
import {Screens} from '../../helpers/ScreenHelpers'
import BackgroundImage from '../../components/backgroundImage/BackgroundImage';

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

    handleLoginButton = () => this.props.navigation.navigate(Screens.LoginScreen);
    // handleLoginButton = () => alert('Login is not available, plese use Guest Mode');   
    handleGuestLogin = () => this.props.navigation.navigate(Screens.GuestScreen);

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
                                text="Student Login"
                                secondaryButton={true}
                            />
                            <Button
                                onPress={this.handleGuestLogin}
                                text="Guest Student"
                                secondaryButton={true}
                            />
                        </View>
                    </View>
                </Animated.View>
            </View>)
    }

    render() {
        return (
            <BackgroundImage>
                {this.renderLoginOption()}
            </BackgroundImage>
        );
    }
}

LoginOptionScreen.propTypes = {
};
let styles = create(LoginStyles);

export default LoginOptionScreen;