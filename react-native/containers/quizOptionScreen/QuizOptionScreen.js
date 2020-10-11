import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView
} from 'react-native';
import Button from '../../baseComponents/button/Button';
import { create } from '../../helpers/PlatformSpecificStyles';
import QuizOptionScreenStyles from './QuizOptionScreenStyles'
import StudentInfoDisplay from '../../components/studentInfoDisplay/StudentInfoDisplay';
import { connect } from 'react-redux';
import LeadersBoardAction from '../leadersBoardScreen/LeadersBoardActions';
import { Screens } from '../../helpers/ScreenHelpers';
import { CompetencyAndGradeArray } from '../../helpers/CommonHelper';
import GradeOption from '../../components/gradeOption/GradeOption'
import GuestActions from '../guestScreen/GuestActions';
import QuizAction from './QuizAction';
import QuizConstants from './QuizConstants';
import ScheduleQuizAction from '../scheduleQuizScreen/ScheduleQuizAction';
import Screen from '../screen/Screen';
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';

class QuizOptionScreen extends Component {
    state = {
        isQuizInstructionEnabled: false,
        isOfflineClickedForLoggedinUser: false,
        offlineGradeSelection: 0,
    };

    componentDidMount() {
        this.props.clearQuizOption();
        this.focusListener = this.props.navigation.addListener('focus', () => {
            this.setState({ isQuizInstructionEnabled: false });
        });
        activateKeepAwake();
    }

    componentWillUnmount() {
        deactivateKeepAwake();
    }

    handlePractiseOffline = () => {
        if (!this.props.isLoggedIn) {
            this.setState({
                isQuizInstructionEnabled: true
            });
            this.props.updateQuizSelection(QuizConstants.QUIZOPTIONS.OFFLINE)
        }
        else {
            this.setState({
                isOfflineClickedForLoggedinUser: true
            });
        }
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
            {this.props.isLoggedIn &&
                <Button
                    onPress={() => this.setState({
                        isQuizInstructionEnabled: false,
                        offlineGradeSelection: 0
                    })}
                    text="Back To Quiz Option"
                />}
        </View>);

    renderQuizOptionButtonsConatiner = () => (
        <View style={styles.quizOptionButtonContainer}>
            <Button
                onPress={() => this.props.fetchScheduleQuiz(this.props.token)}
                text="Schedule Class"
                disabled={!this.props.isLoggedIn}
                secondaryButton={!this.props.isLoggedIn}
            />
            <Button
                onPress={this.handleVirtualSection}
                text="Virtual Class"
                disabled={!this.props.isLoggedIn}
                secondaryButton={!this.props.isLoggedIn}
            />

            <Button
                onPress={this.handlePractiseOffline}
                text="Practice Offline"
            />
        </View>);


    handleVirtualSection = () => {
        const competencyArray = (this.props.competencyLevelVirtual?.length > 1) ? this.props.competencyLevelVirtual : CompetencyAndGradeArray[this.props.grade]
        this.props.updateVirtualCompetency(competencyArray, QuizConstants.QUIZOPTIONS.VIRTUAL);
        this.props.clearLeadersBoard();

        this.setState({
            isQuizInstructionEnabled: true,
            isOfflineClickedForLoggedinUser: false

        });
    }

    handleOfflineGradeSelection = (offlineGradeSelection) => {
        this.props.updatecompetencyLevel(CompetencyAndGradeArray[offlineGradeSelection], QuizConstants.QUIZOPTIONS.OFFLINE);

        this.setState({
            offlineGradeSelection,
            isQuizInstructionEnabled: true,
            isOfflineClickedForLoggedinUser: false
        })
    }

    renderOfflineSection = () => {
        return (
            <View style={styles.offlineGrade}>
                <GradeOption options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
                    onSelect={this.handleOfflineGradeSelection}
                    value={this.state.offlineGradeSelection} />
            </View>
        );
    }

    render() {
        const comp = this.state.isQuizInstructionEnabled ? this.renderInstructions() : this.renderQuizOptionButtonsConatiner();
        const rollNum = this.props.rollNumber ? `Roll No: ${this.props.rollNumber}` : '';
        const gradeSection = this.props.grade + '' + (this.props.section ? this.props.section : '');
        const compLevel = this.props.isLoggedIn ? this.props.competencylevelFromAPI/100 : '';
        return (
            <Screen>
                <ScrollView keyboardShouldPersistTaps={'always'}
                    ref={c => (this.scrollView = c)}
                    onContentSizeChange={() => {
                        this.scrollView.scrollToEnd({ animated: true });
                    }}
                >
                    <StudentInfoDisplay name={this.props.name}
                        grade={gradeSection}
                        position = {rollNum}
                        school={this.props.school}
                        compLevel={compLevel} />
                    {comp}
                    {this.state.isOfflineClickedForLoggedinUser &&
                        this.renderOfflineSection()}
                </ScrollView>
            </Screen>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        name: state.login.userData?.name,
        grade: state.login.userData?.grade,
        rollNumber: state.login.userData?.rollNumber,
        section: state.login.userData?.section,
        school: state.login.userData?.schoolName,
        isLoggedIn: state.login?.isLoggedIn,
        token: state.login.userData?.token,
        competencylevelFromAPI: state.login.userData?.competencylevelFromAPI,
        competencyLevelVirtual: state.login.userData?.competencyLevelVirtual
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        clearLeadersBoard: function () {
            dispatch(LeadersBoardAction.clearLeadersBoard());
        },
        updatecompetencyLevel: function (newCompetencyLevel, selectedQuiz) {
            dispatch(GuestActions.updatecompetencyLevel(newCompetencyLevel));
            dispatch(QuizAction.updateQuizSelection(selectedQuiz));
        },
        updateQuizSelection: function (selectedQuiz) {
            dispatch(QuizAction.updateQuizSelection(selectedQuiz));
        },
        updateVirtualCompetency: function (newCompetencyLevel, selectedQuiz) {
            dispatch(GuestActions.updateVirtualCompetency(newCompetencyLevel));
            dispatch(QuizAction.updateQuizSelection(selectedQuiz));
        },
        clearQuizOption: function () {
            dispatch(QuizAction.clearQuizOption());
        },
        fetchScheduleQuiz: function (token) {
            dispatch(ScheduleQuizAction.getQuizList(token, ownProps.navigation))
        }
    }
}

let styles = create(QuizOptionScreenStyles);


export default connect(mapStateToProps, mapDispatchToProps)(QuizOptionScreen);