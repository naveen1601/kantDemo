import React, { Component } from 'react';
import { create } from '../../helpers/PlatformSpecificStyles';
import GuestScreenStyles from './GuestScreenStyles'
import { View } from 'react-native';
import GradeOption from '../../components/gradeOption/GradeOption'
import Text from '../../baseComponents/text/Text';
import TextInput from '../../baseComponents/textInput/TextInput';
import Button from '../../baseComponents/button/Button';
import _ from 'lodash';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import GuestActions from './GuestActions';
class GuestScreen extends Component {
    state = {
        name: _.get(this.props.userData, "name" ),
        grade: _.get( this.props.userData, "grade"),
        nameHasErrors: false,
        gradeSelected: false
    };

    handleNameChange = (name) => {
        this.setState({
            name
        });
    }
    handleGradeSelection = (grade) => {
        this.setState({
            grade
        });
    }

    isNameValid = (name) => {
        return !_.isEmpty(name)
    }
    isGradeValid = (grade) => {
        return grade > 0;
    }

    areUserInputValid = () => {
        const nameValidation = this.isNameValid(this.state.name);
        const gradeValidation = this.isGradeValid(this.state.grade);
        this.setState({
            nameHasErrors: !nameValidation,
            gradeNotSelected: !gradeValidation
        });
        return nameValidation && gradeValidation;
    }

    handleGuestSubmit = () => {
        if (this.areUserInputValid()) {
            this.props.saveGuestUser({
                name: this.state.name,
                grade: this.state.grade
            })
            this.props.navigation.navigate('QuizOptionScreen');
        }
    }

    render() {
        return (
            <KeyboardAwareScrollView>
                <View style={styles.guestScreen}>
                    <View style={styles.gradeLabelBox}>
                        <Text style={styles.gradeLabelText}> Choose your grade </Text>
                        {this.state.gradeNotSelected &&
                            <Text style={styles.validationErrorText}> Grade is not selected</Text>
                        }
                    </View>
                    <GradeOption options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
                        onSelect={this.handleGradeSelection}
                        value={this.state.grade} />
                    
                    <View style={styles.nameLabelBox}>
                        <Text style={styles.nameLabelText}>Enter Name</Text>
                        <TextInput value={this.state.name}
                            placeholder="First Name"
                            onChangeText={this.handleNameChange}
                            hasErrors={this.state.nameHasErrors} />
                        {this.state.nameHasErrors &&
                            <Text style={styles.validationErrorText}>Please enter valid name</Text>
                        }
                    </View>
                    
                    <Button
                        onPress={this.handleGuestSubmit}
                        text="Submit"
                    />
                </View>
            </KeyboardAwareScrollView>
        );
    }
}
let styles = create(GuestScreenStyles);

function mapStateToProps(state) {
    return {
        userData: state.login.userData,
        isGuest: state.login.isGuest
    };
}

function mapDispatchToProps(dispatch) {
    return {
        saveGuestUser: function(userData) { 
            dispatch(GuestActions.saveGuestUser(userData));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GuestScreen);