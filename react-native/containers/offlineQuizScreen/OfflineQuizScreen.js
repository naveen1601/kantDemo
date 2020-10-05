import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import Button from '../../baseComponents/button/Button';
import { create } from '../../helpers/PlatformSpecificStyles';
import OfflineQuizScreenStyles from './OfflineQuizScreenStyles'
import { connect } from 'react-redux';
import CountDown from 'react-native-countdown-component';
import Text from '../../baseComponents/text/Text';
import TextInput from '../../baseComponents/textInput/TextInput';
import FlatButton from '../../baseComponents/button/FlatButton';
import QuestionAnswer from '../../components/questionAnswer/QuestionAnswer';
import _ from 'lodash'
import StudentInfoDisplay from '../../components/studentInfoDisplay/StudentInfoDisplay';
import { randomNumberBetweenTwoNum, updatePairsWithScore, getTimerBasedOnGrade } from '../../helpers/CommonHelper';
import { findQuestionsForQuiz } from '../../helpers/QuizSetup';
import { Screens, resetScreen } from '../../helpers/ScreenHelpers';
import LeadersBoardAction from '../leadersBoardScreen/LeadersBoardActions';
import Config from '../../Configs';
import GuestActions from '../guestScreen/GuestActions';
import BounceButton from '../../components/bounceButton/BounceButton';
import QuizConstants from '../quizOptionScreen/QuizConstants';


class OfflineQuizScreen extends Component {


    constructor(props) {
        super(props);
        // this.competencyLevelBasedOnQuiz = this.props.selectedQuiz == QuizConstants.QUIZOPTIONS.OFFLINE ? this.props.competencyLevel :
        //     this.props.competencyLevelVirtual
        this.state = {
            isAnswerEmpty: false,
            quiz: findQuestionsForQuiz(this.props.competencyLevel, randomNumberBetweenTwoNum(6, 10))
                .map((item, index) =>
                    ({ ...item, index, showEmptyWarning: false, userAnswer: '', isUserAnswerCorrect: false })),
            currentQuestionIndex: 0,
            isQuizEnded: false,
            isReviewAnswerClicked: false,
            userScore: 0
        };
        this.timer = getTimerBasedOnGrade(this.props.grade);
        this.currentUser = '';
        this.botObject = '';
        this.getStudentAndOpponentFromPair();

    }

    handleUserInput = ({ userAnswer, key }) => {
        let questionWithUserInput = this.state.quiz;
        questionWithUserInput[key].userAnswer = userAnswer
        this.setState({
            quiz: questionWithUserInput
        })
    }

    renderQuestionAndAnswer = () => {
        const currentQuestion = this.state.currentQuestionIndex < this.state.quiz.length &&
            this.state.quiz[this.state.currentQuestionIndex];

        return currentQuestion && (<QuestionAnswer
            question={currentQuestion.ques}
            questionParam={currentQuestion.questParam}
            userAnswer={currentQuestion.userAnswer}
            onChangeValue={this.handleUserInput}
            quesIndex={currentQuestion.index}
            isEmptyWarning={currentQuestion.showEmptyWarning} />)
    }

    renderPreviousButton = () => {
        return (this.state.currentQuestionIndex > 0) && (
            <View>
                <FlatButton
                    onPress={this.renderPreviousQuestion}
                    text={'Previous'}
                />
            </View>
        )
    }

    renderNextButton = () => {
        return (this.state.currentQuestionIndex < this.state.quiz.length - 1) && (
            <View>
                <FlatButton
                    onPress={this.renderNextQuestion}
                    text={'Next'}
                />
            </View>
        )
    }

    getNewCompetency = (score) => {
        const newList = this.props.competencyLevel;
        const percent = (score / this.state.quiz.length) * 100;
        let newCompValue;
        try {
            if (percent > 50) {
                const lastCompIndex = Config.COMPETENCY_LIST.indexOf(this.props.competencyLevel[this.props.competencyLevel.length - 1]);
                newCompValue = Config.COMPETENCY_LIST[lastCompIndex + 1];
                if (newCompValue) {
                    newList.push(newCompValue);
                    newList.shift();
                }
            }
            else {
                const firstCompIndex = Config.COMPETENCY_LIST.indexOf(this.props.competencyLevel[0]);
                newCompValue = Config.COMPETENCY_LIST[firstCompIndex - 1];
                if (newCompValue) {
                    newList.unshift(newCompValue);
                    newList.pop();
                }
            }
        }
        catch (e) { };
        return newList;
    }

    submitQuiz = () => {
        const quizWithAns = this.state.quiz.map(item => {
            item.isUserAnswerCorrect = this.compareAnswer(item.ans, item.userAnswer);
            return item;
        });
        const userScore = quizWithAns.filter(item => item.isUserAnswerCorrect).length
        let botsWithScore = updatePairsWithScore(userScore, this.props.botsPair, this.state.quiz.length);

        if (this.props.selectedQuiz == QuizConstants.QUIZOPTIONS.OFFLINE) { this.props.updatecompetencyLevel(this.getNewCompetency(userScore)); }
        else if (this.props.selectedQuiz == QuizConstants.QUIZOPTIONS.VIRTUAL) { this.props.updatecompetencyLevelVirtual(this.getNewCompetency(userScore)); }

        this.props.updateScore(botsWithScore);
        this.setState({
            isQuizEnded: true,
            quiz: quizWithAns,
            userScore
        });
    }

    compareAnswer = (correctAns, userAns) => {
        if (_.isEmpty(userAns)) return false;
        let systemAns = String(correctAns).trim().split(' ').join('');
        let userInput = String(userAns).trim().split(' ').join('');

        let isCorrect = (systemAns == userInput);
        if (!isCorrect && systemAns.split('(').length > 1) {
            systemAns = systemAns.split('(');
            userInput = userInput.split('(');
            const firstPartOfAns = systemAns[0] == userInput[0];
            const userHasSecondAnswer = userInput.length > 1;
            isCorrect = userHasSecondAnswer ? (systemAns[1] == userInput[1] && firstPartOfAns) :
                firstPartOfAns;

        }
        return isCorrect;
    }

    renderSubmitButton = () => {
        const isLastQuestion = !(this.state.currentQuestionIndex < this.state.quiz.length - 1);
        const buttonText = "Submit Quiz";
        if (isLastQuestion) {
            return (
                <Button
                    onPress={this.submitQuiz}
                    text={buttonText}
                />
            );
        }

    }

    renderNextQuestion = () => {
        this.setState({ currentQuestionIndex: ++this.state.currentQuestionIndex });
    }

    renderPreviousQuestion = () => {
        this.setState({ currentQuestionIndex: --this.state.currentQuestionIndex });
    }

    renderQuizReview = () => {
        return (
            <View >
                {this.state.quiz.map((item, index) => {
                    const answerStyle = [styles.reviewUserAnswerText];
                    item.isUserAnswerCorrect ? answerStyle.push(styles.corrrectUserAnswerText) :
                        answerStyle.push(styles.errorUserAnswerText);

                    return (
                        <View>
                            <Text style={styles.reviewQuestionText}>{index + 1}. {item.ques} : {item.questParam}</Text>
                            <Text style={styles.reviewAnswerText}>Ans. {item.ans}</Text>
                            <Text style={answerStyle}>Your Ans. {item.userAnswer}</Text>
                        </View>
                    )
                })}
                <View style={styles.heightPatch} />
                {/* <BounceButton
                    onPress={() => this.props.navigation.replace(Screens.LeadersBoardScreen)}
                    value={'See Leaderboard22'} /> */}
            </View>
        )
    }

    renderQuizSection = () => (
        <View>
            <CountDown
                until={this.timer}
                onFinish={this.submitQuiz}
                onPress={() => { }}
                timeToShow={['M', 'S']}
                digitStyle={{ backgroundColor: '#FFF', borderWidth: 1, borderColor: '#255166' }}
                digitTxtStyle={{ color: '#255166' }}
                separatorStyle={{ color: '#255166', paddingBottom: 25 }}
                showSeparator
                size={30}
            />
            <View style={styles.switchQuestionSection}>
                {this.renderPreviousButton()}
                <Text style={styles.questionNumberDisplay}>Que. {this.state.currentQuestionIndex + 1} of {this.state.quiz.length} </Text>
                {this.renderNextButton()}
            </View>
            {this.renderQuestionAndAnswer()}
            {this.renderSubmitButton()}
        </View>
    )

    // getBotObjectFromPairObject = () => {
    //     //(bot.id == 100 || (bot.studentId && (bot.studentId == this.props.userId)))
    //     // serialNum
    //     return this.props.botsPair.flat().find(bot => bot.id == this.props.botIdPairedWithUser);
    // }

    getStudentAndOpponentFromPair = () => {
        const flatList = this.props.botsPair.flat();
        this.currentUser = flatList.find(bot => bot.id == 100);
        this.botObject = flatList.find(bot => bot.id == this.props.botIdPairedWithUser);
    }

    renderScoreBoxContainer = (botObject) => {

        const quizLength = this.state.quiz.length;

        return (
            <>
                <Text style={styles.quizResultLabel}> Quiz Result </Text>
                <View style={styles.scoreBoxContainer}>
                    <View style={styles.scoreBox}>
                        <Text style={styles.displayScoreText}>{this.props.name}</Text>
                        <Text style={styles.displayScoreText}>{this.state.userScore}/{quizLength}</Text>
                        <Text style={styles.displayScoreText}>Correct</Text>
                    </View>
                    <View style={styles.scoreBox}>
                        <Text style={styles.displayScoreText}>{botObject.name}</Text>
                        <Text style={styles.displayScoreText}>{botObject.score}/{quizLength}</Text>
                        <Text style={styles.displayScoreText}>Correct</Text>
                    </View>
                </View>
                <View style={styles.reviewAnswerButton}>
                    <Button
                        onPress={() => this.setState({ isReviewAnswerClicked: true })}
                        text={'Review Answer'} />
                </View>
            </>)
    }

    render() {
        let isrenderQuizReviewEnabled = this.state.isQuizEnded && this.state.isReviewAnswerClicked;
        let comp = this.state.isQuizEnded ?
            (this.state.isReviewAnswerClicked ? this.renderQuizReview() : this.renderScoreBoxContainer(this.botObject)) :
            this.renderQuizSection();
        // const comp = this.renderQuizReview();
        const gradeSection = this.props.grade + '' + (this.props.section ? this.props.section : '');

        return (
            <View style={styles.reviewContainer}>
                <ScrollView keyboardShouldPersistTaps={'always'}>
                    <View style={styles.userInfoBox}>
                        <StudentInfoDisplay
                            name={this.props.name}
                            grade = {gradeSection}
                            school={this.props.school}
                            position={`Position: ${this.currentUser.serialNum}`}
                            isSmall />
                        <StudentInfoDisplay
                            name={this.botObject.name}
                            school={this.props.school}
                            grade={gradeSection}
                            position={`Position: ${this.botObject.serialNum}`}
                            isSmall />
                    </View>
                    <View style={styles.OfflineQuizScreen}>
                        {comp}
                    </View>
                </ScrollView>
                {isrenderQuizReviewEnabled && <BounceButton
                    onPress={() => this.props.navigation.replace(Screens.LeadersBoardScreen)}
                    value={'See Leaderboard'} />
                }
            </View>
        );
    }
}

const mapStateToProps = state => {
    let selectCompLevel = (state.quiz.selectedQuiz == QuizConstants.QUIZOPTIONS.OFFLINE) ? state.login.userData?.competencyLevel :
        state.login.userData?.competencyLevelVirtual
    return {
        name: state.login.userData?.name,
        grade: state.login.userData?.grade,
        section: state.login.userData?.section,
        school: state.login.userData?.school,
        competencyLevel: selectCompLevel,
        isLoggedIn: state.login.isLoggedIn,
        botIdPairedWithUser: state.leadersBoard.botIdPairedWithUser,
        botsPair: state.leadersBoard.botsPair,
        selectedQuiz: state.quiz.selectedQuiz
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateScore: function (scoreData) {
            dispatch(LeadersBoardAction.updateScore(scoreData));
        },
        updatecompetencyLevel: function (newCompetencyLevel) {
            dispatch(GuestActions.updatecompetencyLevel(newCompetencyLevel));
        }
    }
}

let styles = create(OfflineQuizScreenStyles);


export default connect(mapStateToProps, mapDispatchToProps)(OfflineQuizScreen);