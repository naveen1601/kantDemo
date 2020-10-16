import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import Button from '../../baseComponents/button/Button';
import { create } from '../../helpers/PlatformSpecificStyles';
import OnlineQuizStyles from './OnlineQuizStyles'
import { connect } from 'react-redux';
import CountDown from 'react-native-countdown-component';
import Text from '../../baseComponents/text/Text';
import FlatButton from '../../baseComponents/button/FlatButton';
import QuestionAnswer from '../../components/questionAnswer/QuestionAnswer';
import _ from 'lodash'
import StudentInfoDisplay from '../../components/studentInfoDisplay/StudentInfoDisplay';
import { getTimerBasedOnGrade, getCompetencyListForOnline, nextQuizData } from '../../helpers/CommonHelper';
import { findQuestionsForQuiz } from '../../helpers/QuizSetup';
import { Screens, resetScreen } from '../../helpers/ScreenHelpers';
import OnlineQuizAction from './OnlineQuizAction';
import ScheduleLeaderBoardAction from '../scheduleLeaderBoardScreen/ScheduleLeaderBoardAction';
import Screen from '../screen/Screen';
import SoundQuestion from '../../components/soundQuestion/SoundQuestion';
import ImageQuestion from '../../components/imageQuestion/ImageQuestion';

class OnlineQuizScreen extends Component {

    constructor(props) {
        super(props);

        this.competencyLevelBasedOnQuiz = getCompetencyListForOnline(this.props.competencyLevel, this.props.grade);

        this.state = {
            quiz: findQuestionsForQuiz(this.competencyLevelBasedOnQuiz, this.props.quizData.numberOfQuestions)
                .map((item, index) =>
                    ({ ...item, index, showEmptyWarning: false, userAnswer: '', isUserAnswerCorrect: false })),

            currentQuestionIndex: 0,
            isQuizEnded: false,
            isReviewAnswerClicked: false,
            userScore: 0,
        };

        this.fetchedLeaderAfterQuiz = false;
        this.sendScoreToDB = false;
        this.oponentScoreApiCalled = false;
        this.nextQuizAttendance = false;
        this.quizTimer = getTimerBasedOnGrade(this.props.grade);

        this.nextQuiz = nextQuizData(this.props.quizScheduleList, this.props.currentQuiz.outerQuizId, this.props.currentQuiz.innerQuizId);
        this.currentUser = '';
        this.botObject = '';
        this.getStudentAndOpponentFromPair();
    }

    componentWillUnmount() {
        clearTimeout(this.fetchScoreTimeId);
        clearTimeout(this.fetchLeaderBoardTimeId);
        clearTimeout(this.markAttendanceTimeId);

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
            isEmptyWarning={currentQuestion.showEmptyWarning}
            qaFormat={currentQuestion.qaFormat} />)
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

    submitQuiz = () => {
        const quizWithAns = this.state.quiz.map(item => {
            item.isUserAnswerCorrect = this.compareAnswer(item.ans, item.userAnswer);
            return item;
        });
        const userScore = quizWithAns.filter(item => item.isUserAnswerCorrect).length
        this.setState({
            isQuizEnded: true,
            isReviewAnswerClicked: true,
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

    // renderSubmitButton = () => {
    //     const isLastQuestion = !(this.state.currentQuestionIndex < this.state.quiz.length - 1);
    //     const buttonText = "Submit Quiz";
    //     if (isLastQuestion) {
    //         return (
    //             <Button
    //                 onPress={this.submitQuiz}
    //                 text={buttonText}
    //             />
    //         );
    //     }
    // }

    renderNextQuestion = () => {
        this.setState({ currentQuestionIndex: ++this.state.currentQuestionIndex });
    }

    renderPreviousQuestion = () => {
        this.setState({ currentQuestionIndex: --this.state.currentQuestionIndex });
    }

    fetchOpponentScore = () => {
        // this.botObject &&
        this.props.fetchOpponentScore(this.props.quizId, this.props.token);
        if (!this.fetchedLeaderAfterQuiz) {
            this.fetchLeaderBoardTimeId = setTimeout(() => {
                this.props.fetchLeadersBoardAfterQuiz(this.props.quizData.id, this.props.userId, this.props.token);
            }, 6000);
            this.fetchedLeaderAfterQuiz = true;
        }

        if (!this.nextQuizAttendance) {
            this.markAttendanceTimeId = setTimeout(() => {
                this.props.markAttendanceForNextQuiz(this.nextQuiz);
            }, 12000);
            this.nextQuizAttendance = true;
        }

    }

    setParameterToShowScore = () => this.setState({ isReviewAnswerClicked: false });

    renderQuizReview = () => {

        if (!this.sendScoreToDB) {
            this.props.sendScoreToDB(this.state.userScore, this.props.quizData.id, this.props.token);
            this.sendScoreToDB = true;
        }

        if (!this.oponentScoreApiCalled) {
            this.oponentScoreApiCalled = true;
            this.fetchScoreTimeId = setTimeout(() => {
                this.fetchOpponentScore();
            }, 6000);
        }
        let comp;

        comp = this.state.quiz.map((item, index) => {
            const answerStyle = [styles.reviewUserAnswerText];
            item.isUserAnswerCorrect ? answerStyle.push(styles.corrrectUserAnswerText) :
                answerStyle.push(styles.errorUserAnswerText);

            const soundName = (item.qaFormat == 'MP3TXT') ?
                item.questParam.split(".mp3")[0] : '';

            const imageName = (item.qaFormat == 'IMGTXT') ?
                item.questParam.split(".jpeg")[0] : '';

            let questionText;
            let mediaQuestion;

            if (soundName) {
                mediaQuestion = <SoundQuestion soundName={soundName} />
            }
            else if (imageName) {
                mediaQuestion = <ImageQuestion imageName={imageName} />
            }
            else {
                questionText = item.questParam;
            }

            return (
                <View>
                    <Text style={styles.reviewQuestionText}>{index + 1}. {item.ques} : {questionText}</Text>
                    {mediaQuestion}
                    <Text style={styles.reviewAnswerText}>Ans. {item.ans}</Text>
                    <Text style={answerStyle}>Your Ans. {item.userAnswer}</Text>
                </View>
            )
        });

        return (
            <>
                {this.renderTimer(22, 'Calculating score in', this.setParameterToShowScore)}
                {comp}
            </>
        )

    }

    renderQuizSection = () => (
        <View>
            <CountDown
                until={this.quizTimer}
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
            {/* {this.renderSubmitButton()} */}
        </View>
    )

    getStudentAndOpponentFromPair = () => {
        const flatList = this.props.leaderBoardData.flat();
        this.currentUser = flatList.find(bot => bot.studentId == this.props.userId);
        this.botObject = flatList.find(bot => bot.studentId == this.props.userOponentId);
    }

    renderTimer = (timer, message, onFinish) => {
        return (
            <View style={styles.reviewBoxTimerContainer}>
                <Text style={styles.reviewBoxTimerText}>{message}  </Text>
                <CountDown
                    until={timer}
                    onFinish={onFinish}
                    onPress={() => { }}
                    timeToShow={['S']}
                    digitStyle={{ backgroundColor: '#FFF' }}
                    digitTxtStyle={{ color: '#255166' }}
                    // timeLabelStyle={{color: 'black', fontWeight: 'bold'}}
                    separatorStyle={{ color: '#255166', paddingBottom: 25 }}
                    showSeparator
                    size={20}
                />
            </View>
        )
    }

    redirectAfterQuiz = () => {
        this.props.navigation.replace(Screens.ScheduleLeaderBoardScreen, {
            isQuizEnded: true
        })
    }

    renderScoreBoxContainer = (botObject) => {
        const quizLength = this.state.quiz.length;
        const opponentStyle = [styles.scoreBox];
        const userStyle = [styles.scoreBox];
        console.log('renderScoreBox ', botObject)


        if (botObject) {
            if (this.state.userScore > this.props.opponentScore) {
                userStyle.push(styles.scoreBoxWinner);
            }
            else if (this.state.userScore < this.props.opponentScore) {
                opponentStyle.push(styles.scoreBoxWinner);
            }
        }

        const userScoreBox = (<View style={userStyle}>
            <Text style={styles.displayScoreText}>{this.props.name}</Text>
            <Text style={styles.displayScoreText}>{this.state.userScore}/{quizLength}</Text>
            <Text style={styles.displayScoreText}>Correct</Text>
        </View>);

        const opponentScoreBox = botObject ? (<View style={opponentStyle}>
            <Text style={styles.displayScoreText}>{botObject.name}</Text>
            <Text style={styles.displayScoreText}>{this.props.opponentScore}/{quizLength}</Text>
            <Text style={styles.displayScoreText}>Correct</Text>
        </View>) : '';
        let firstBox = userScoreBox;
        let secondBox = opponentScoreBox;

        if(botObject && this.state.userScore < this.props.opponentScore){
            secondBox = userScoreBox;
            firstBox = opponentScoreBox;
        }

        return (
            <>
                <Text style={styles.quizResultLabel}> Quiz Result </Text>
                {this.renderTimer(3, 'Updating LeaderBoard', this.redirectAfterQuiz)}
                <View style={styles.scoreBoxContainer}>
                    {firstBox}
                    {secondBox}
                </View>
            </>)
    }

    render() {

        let comp = this.state.isQuizEnded ?
            (this.state.isReviewAnswerClicked ? this.renderQuizReview() : this.renderScoreBoxContainer(this.botObject)) :
            this.renderQuizSection();

        let isSmall = true;
        let grade;
        if (!this.botObject) {
            isSmall = false
            grade = this.props.grade + '' + (this.props.section ? this.props.section : '');

        }
        const quizSequence = (this.props.quizData.sequence_value % 2 == 0) ? 'Even First Pair' : 'Odd First Pair';

        return (
            <Screen>
                <View style={styles.reviewContainer}>
                    <ScrollView keyboardShouldPersistTaps={'always'}>
                        <View><Text style={styles.displaySequenceText}>{quizSequence}</Text></View>
                        <View style={styles.userInfoBox}>
                            <StudentInfoDisplay
                                name={this.props.name}
                                grade={grade}
                                rollNum={this.props.rollNumber}
                                isSmall={isSmall}
                                position={`Position: ${this.currentUser.sequence}`} />
                            {!!this.botObject && <StudentInfoDisplay
                                name={this.botObject.name}
                                rollNum={this.botObject.rollNumber}
                                isSmall={isSmall}
                                position={`Position: ${this.botObject.sequence}`} />}
                        </View>
                        <View style={styles.OnlineQuizScreen}>
                            {comp}
                        </View>
                    </ScrollView>
                </View>
            </Screen>
        );
    }
}

const mapStateToProps = state => {
    return {
        name: state.login.userData?.name,
        grade: state.login.userData?.grade,
        section: state.login.userData?.section,
        rollNumber: state.login.userData?.rollNumber,
        school: state.login.userData?.schoolName,
        userId: state.login.userData?.userId,
        competencyLevel: state.login.userData?.competencylevelFromAPI,
        quizData: state.scheduleQuiz.currentQuiz?.quizData,
        leaderBoardData: state.scheduleLeaderBoard?.pairingMatrix, //studentId
        userOponentId: state.scheduleLeaderBoard?.userOponentId,
        token: state.login.userData?.token,
        opponentScore: state.scheduleQuiz.opponentScore,
        quizId: state.scheduleQuiz.currentQuiz?.innerQuizId,
        quizScheduleList: state.scheduleQuiz?.scheduleQuizList,
        currentQuiz: state.scheduleQuiz?.currentQuiz

    }
}

export const mergeProps = (stateProps, dispatchProps, ownProps) => {

    let actionProps = Object.assign({}, dispatchProps, {

        markAttendanceForNextQuiz: (currentQuiz) => {
            dispatchProps.markAttendanceForNextQuiz(currentQuiz, stateProps.userId, stateProps.token)
        }

    });

    return Object.assign({}, ownProps, stateProps, actionProps);
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchOpponentScore: function (quizId, token) { // 0+7 sec
            dispatch(OnlineQuizAction.fetchOpponentScore(quizId, token));
        },
        sendScoreToDB: function (score, quizId, token) { //0 sec
            dispatch(OnlineQuizAction.sendScoreToDB(score, quizId, token, ownProps.navigation));
        },
        fetchLeadersBoardAfterQuiz: function (quizId, userId, token) { // 0+7+7 sec
            dispatch(ScheduleLeaderBoardAction.getLeadersBoardAfterQuiz(quizId, userId, token, ownProps.navigation))
        },
        markAttendanceForNextQuiz: function (currentQuiz, userId, token) { // 0+7+7+6 sec
            dispatch(ScheduleLeaderBoardAction.markAttendanceForNextQuiz(currentQuiz, userId, token, ownProps.navigation))

        }
    }
}

let styles = create(OnlineQuizStyles);


export default connect(mapStateToProps, mapDispatchToProps)(OnlineQuizScreen);