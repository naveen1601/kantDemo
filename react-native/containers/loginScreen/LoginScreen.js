import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginStyles, { PropStyles } from './LoginStyles';
import { create } from '../../helpers/PlatformSpecificStyles';
import TextInput from '../../baseComponents/textInput/TextInput';
import PasswordInput from '../../baseComponents/passwordInput/PasswordInput';
import Button from '../../baseComponents/button/Button';
import {
    View,
    ScrollView,
} from 'react-native';
import Text from '../../baseComponents/text/Text';
import _ from 'lodash';
import LoginAction from './LoginAction';
import Alert from '../../baseComponents/alert/Alert';

class LoginScreen extends Component {

    state = {
        userName: 'KL0010_7A_1',
        password: 'naveen1',
        schoolCode: '',
        userNameHasError: false,
        passwordHasError: false,
        schoolCodeHasError: false,
        showSponsorship: false

    };

    componentDidMount() {
        this.props.resetErrorMessage();
    }


    handleUserNameChange = (text) => {
        this.setState({ userName: text });
    }

    handlePasswordChange = (text) => {
        this.setState({ password: text });
    }

    handleSchoolCodeChange = (text) => {
        this.setState({ schoolCode: text });
    }

    isNameValid = (name) => {
        return !_.isEmpty(String(name).trim())
    }

    areUserInputValid = () => {
        const nameValidation = this.isNameValid(this.state.userName);
        //const schoolValidation = this.isNameValid(this.state.schoolCode);
        const passwordValidation = this.isNameValid(this.state.password);

        this.setState({
            //schoolCodeHasError: !schoolValidation,
            passwordHasError: !passwordValidation,
            userNameHasError: !nameValidation
        });
        return nameValidation && passwordValidation;
    }

    setSponsorCallback = () => {
        this.setState({ showSponsorship: true })
    }

    handleLoginButton = () => {
        if (this.areUserInputValid()) {
            this.props.doLogin(this.state.schoolCode, this.state.userName, this.state.password, this.setSponsorCallback);
        }
    }

    renderLoginModal = () => {
        return (
            <ScrollView keyboardShouldPersistTaps={'always'}>
                <View style={styles.loginBox}>
                    {/* <View style={styles.textInputFieldsContainer}>
                        <Text style={styles.nameLabelText}>School Code:</Text>
                        <TextInput
                            testId="userNameTextInput"
                            onChangeText={this.handleSchoolCodeChange}
                            value={this.state.schoolCode}
                            placeholder={'Enter School Code'}
                            keyboardType="email-address"
                            hasErrors={this.state.schoolCodeHasError}
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={styles.inputStyle}
                        />
                    </View> */}
                    <View style={styles.textInputFieldsContainer}>
                        <Text style={styles.nameLabelText}>User Name:</Text>
                        <TextInput
                            testId="userNameTextInput"
                            onChangeText={this.handleUserNameChange}
                            value={this.state.userName}
                            placeholder={'Enter User Name'}
                            keyboardType="email-address"
                            hasErrors={this.state.userNameHasError}
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={styles.inputStyle}

                        />
                    </View>
                    <View style={styles.textInputFieldsContainer}>
                        <Text style={styles.nameLabelText}>Enter Password:</Text>
                        <PasswordInput onChangeText={this.handlePasswordChange}
                            testID="passwordTextInput"
                            placeholder={'Enter Password'}
                            hasErrors={this.state.passwordHasError}
                            maxLength={100}
                            value={this.state.password}
                            style={styles.inputStyle}
                        />
                    </View>
                    {!!this.props.loginErrorMessage && <Alert message={this.props.loginErrorMessage}
                        type="error" />
                    }
                    <View style={styles.loginButton}>
                        <Button
                            onPress={this.handleLoginButton}
                            text={'Login'}
                            style={styles.buttonStyle}
                        />
                    </View>
                </View>

            </ScrollView>
        );
    }

    renderSponsorScreen = () => (
        <View  style={styles.sponsorScreen}>
            <Text style={styles.sponsorLabelText}>Sponsered By</Text>
            <Text style={styles.sponsorNameText}>{this.props.sponsoredBy}</Text>
        </View>
    )

    render() {
        const comp = this.state.showSponsorship ? this.renderSponsorScreen() : this.renderLoginModal();
        return (
            <View style={styles.loginContainer}>
                {comp}
            </View>
        );
    }
}

LoginScreen.propTypes = {
};
let styles = create(LoginStyles);


const mapStateToProps = (state) => {
    return {
        loginErrorMessage: state.login.loginErrorMessage,
        sponsoredBy: state.login?.userData?.sponsoredBy,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        doLogin: (schoolCode, userName, password, setSponsorCallback) => {
            dispatch(LoginAction.doLogin(schoolCode, userName, password, setSponsorCallback, ownProps.navigation));
        },
        resetErrorMessage: () => {
            dispatch(LoginAction.resetErrorMessage());
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)