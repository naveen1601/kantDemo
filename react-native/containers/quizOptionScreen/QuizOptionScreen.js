import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Button from '../../baseComponents/button/Button';
import { create } from '../../helpers/PlatformSpecificStyles';
import QuizOptionScreenStyles from './QuizOptionScreenStyles'
import StudentInfoDisplay from '../../components/studentInfoDisplay/StudentInfoDisplay';
import { connect } from 'react-redux';
import LeadersBoardAction from '../leadersBoardScreen/LeadersBoardActions';
import { Screens } from '../../helpers/ScreenHelpers';

class QuizOptionScreen extends Component {
    state = {
        isQuizInstructionEnabled: false
    };

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('focus', () => {
            this.setState({ isQuizInstructionEnabled: false });
          });
    }

    handlePractiseOffline = () => {
        this.setState({
            isQuizInstructionEnabled: true
        });
        this.props.clearLeadersBoard();
    }

    renderInstructions = () => (
        <View style={styles.instructionContainer}>
            <Text style={styles.instructionLabel}>Instructions</Text>
            <View style={styles.instructionTextContainer}>
                <Text style={styles.instructionText}>1. You have to finish your Quiz in limited time period.</Text>
                <Text style={styles.instructionText}>2. You can skip the question by clicking 'Next'</Text>
                <Text style={styles.instructionText}>3. You can revisit the questions by clicking 'Previous'</Text>
            </View>
            <Button
                onPress={() => this.props.navigation.navigate(Screens.LeadersBoardScreen)}
                text="Start Quiz"
            />
        </View>);


    renderQuizOptionButtonsConatiner = () => (
        <View style={styles.quizOptionButtonContainer}>
            <Button
                onPress={() => { }}
                text="Schedule Class"
                disabled={!this.props.isLoggedIn}
                secondaryButton={!this.props.isLoggedIn}


            />
            <Button
                onPress={() => { }}
                text="Virtual Class"
                disabled={!this.props.isLoggedIn}
                secondaryButton={!this.props.isLoggedIn}
            />

            <Button
                onPress={this.handlePractiseOffline}
                text="Practice Offline"
            />
        </View>);

    render() {
        const comp = this.state.isQuizInstructionEnabled ? this.renderInstructions() : this.renderQuizOptionButtonsConatiner()
        return (
            <View>
                <StudentInfoDisplay name={this.props.name}
                    grade={this.props.grade}
                    school={this.props.school} />
                {comp}
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        name: state.login.userData && state.login.userData.name,
        grade: state.login.userData && state.login.userData.grade,
        school: state.login.userData && state.login.userData.school,
        isLoggedIn: state.login.isLoggedIn
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        clearLeadersBoard: function () {
            dispatch(LeadersBoardAction.clearLeadersBoard());
        }
    }
}

let styles = create(QuizOptionScreenStyles);


export default connect(mapStateToProps, mapDispatchToProps)(QuizOptionScreen);