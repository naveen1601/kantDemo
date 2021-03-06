import React, { Component } from 'react';
import { create } from '../../helpers/PlatformSpecificStyles';
import GuestScreenStyles from './GuestScreenStyles'
import { View, ScrollView } from 'react-native';
import GradeOption from '../../components/gradeOption/GradeOption'
import Text from '../../baseComponents/text/Text';
import TextInput from '../../baseComponents/textInput/TextInput';
import Button from '../../baseComponents/button/Button';
import _ from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GuestActions from './GuestActions';
import { CompetencyAndGradeArray } from '../../helpers/CommonHelper';
//temp
import {Screens} from '../../helpers/ScreenHelpers'
class GuestScreen extends Component {
    state = {
        name: _.get(this.props.userData, "name"),
        grade: _.get(this.props.userData, "grade"),
        nameHasErrors: false,
        gradeSelected: false
    };

    handleNameChange = (fname) => {
        const name = this.state.name ? fname :  String(fname).trim();
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
        return !_.isEmpty(String(name).trim())
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
                name: this.state.name.charAt(0).toUpperCase() + this.state.name.slice(1),
                grade: this.state.grade,
                competencyLevel: CompetencyAndGradeArray[this.state.grade],
            })
           this.props.navigation.navigate(Screens.QuizOptionScreen);
        }
    }

    render() {
        return (
            <ScrollView keyboardShouldPersistTaps={'always'}>
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

                    <View style={styles.nameContainer}>
                        <Text style={styles.nameLabelText}>Enter Name</Text>
                        <View style={styles.nameInputBox}>
                            <TextInput value={this.state.name}
                                placeholder="First Name"
                                onChangeText={this.handleNameChange}
                                hasErrors={this.state.nameHasErrors} />
                            {this.state.nameHasErrors &&
                                <Text style={styles.validationErrorText}>Please enter valid name</Text>
                            }
                        </View>
                    </View>

                    <Button
                        onPress={this.handleGuestSubmit}
                        text="Submit"
                    />
                </View>
            </ScrollView>
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
        saveGuestUser: function (userData) {
            dispatch(GuestActions.saveGuestUser(userData));
        }
    };
}

GuestScreen.propTypes = {
    saveGuestUser: PropTypes.func,
    userData: PropTypes.object,
    isGuest: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(GuestScreen);