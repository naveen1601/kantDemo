import React, { Component, Fragment } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text as ReactText,
    StatusBar,
  } from 'react-native';
import {
Colors,
} from 'react-native/Libraries/NewAppScreen';

import TextInput from './baseComponents/textInput/TextInput';
import Text from './baseComponents/text/Text';
import Button from './baseComponents/button/Button';
import FlatButton from './baseComponents/button/FlatButton';
import Password from './baseComponents/passwordInput/PasswordInput';
import _ from 'lodash';
import Config from './Configs';
import SelectBox from './baseComponents/selectBox/SelectBox';
import GradeOptions from './components/gradeOption/GradeOption'


export default class ComponentsDemoPage extends Component {
    state = {
        password: "",
        username: ""
    };

    handlePasswordChange = (password) => {
        this.setState({
            password,
            passwordHasErrors: !this.isPasswordValid(password)
        });
    }

    isPasswordValid = (value) => {
        let passwordRegex = new RegExp(Config.PASSWORD_PATTERN + '{' + Config.PASSWORD_MIN_CHARACTERS + ',' + Config.PASSWORD_MAX_CHARACTERS + '}$')
        return !_.isEmpty(value) && passwordRegex.test(value);
    }

    handleUserNameChange = (username) => {
        this.setState({ 
            username
        });
    }

    render(){
        return(
            <Fragment>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor="transparent" />
                <SafeAreaView>
                    <ScrollView>
                        <View style={styles.body}>
                            <View style={styles.sectionContainer}>
                                <ReactText style={styles.sectionTitle}>First Step</ReactText>
                                <ReactText style={styles.sectionDescription}>
                                    <ReactText style={styles.highlight}>ReactText Input</ReactText>
                                </ReactText>
                                <TextInput
                                    testId="userNameTextInput"
                                    onChangeText={this.handleUserNameChange}
                                    value={this.state.userName}
                                    placeholder="Enter Your User Id"
                                    keyboardType="email-address"
                                    hasErrors={false}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />
                                <ReactText style={styles.sectionDescription}>
                                    <Text > Text box or Label </Text>
                                </ReactText>
                                <Button
                                    onPress={() => { }}
                                    text="Primary Button"
                                />
                                <Button
                                    onPress={() => { }}
                                    text="Secondary Button"
                                    secondaryButton={true}
                                />
                                <Button
                                    onPress={() => { }}
                                    text="Tertiary Button"
                                    tertiaryButton={true}
                                />
                                <Button
                                    onPress={() => { }}
                                    text="Quaternary Button"
                                    quaternaryButton={true}
                                />
                                <FlatButton
                                    text="Flat Button"
                                    onPress={() => { }}
                                />

                                <Password
                                    onChangeText={this.handlePasswordChange}
                                    placeholder="Password"
                                    value={this.state.password}
                                    hasErrors={this.state.passwordHasErrors}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />
                                <ReactText style={styles.highlight}>SelectBox</ReactText>
                                <GradeOptions options={[1,2,3,4,5]}/>
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </Fragment >
        );
    };
}
const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    flatButton: {
        borderColor: 'black',
        borderWidth: 1,
        color: 'black'
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {
        backgroundColor: Colors.white,
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        paddingBottom: 10,
        fontWeight: '600',
        color: Colors.black,
    },
    sectionDescription: {
        marginTop: 8,
        paddingBottom: 4,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,
    },
    highlight: {
        fontWeight: '700'

    },
    footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
});