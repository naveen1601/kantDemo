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
import { getTimerBasedOnGrade, getCompetencyListForOnline } from '../../helpers/CommonHelper';
import { findQuestionsForQuiz } from '../../helpers/QuizSetup';
import { Screens, resetScreen } from '../../helpers/ScreenHelpers';
import OnlineQuizAction from './OnlineQuizAction';
import ScheduleLeaderBoardAction from '../scheduleLeaderBoardScreen/ScheduleLeaderBoardAction';
import Screen from '../screen/Screen';


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
            fetchedLeaderfterQuiz: false,
            oponentScoreApiCalled: false
        };
        //this.timer = getTimeDifferenceInSeconds(this.props.quizData.startDate, this.props.quizData.endDate);
        this.timer = getTimerBasedOnGrade(this.props.grade);

        this.botObject = '';
    }

    componentWillUnmount() {
        clearTimeout(this.fetchScoreTimeId);
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

    submitQuiz = () => {
        const quizWithAns = this.state.quiz.map(item => {
            item.isUserAnswerCorrect = this.compareAnswer(item.ans, item.userAnswer);
            return item;
        });
        const userScore = quizWithAns.filter(item => item.isUserAnswerCorrect).length
        // let botsWithScore = updatePairsWithScore(userScore, this.props.botsPair, this.state.quiz.length);

        // if (this.props.selectedQuiz == QuizConstants.QUIZOPTIONS.OFFLINE) { this.props.updatecompetencyLevel(this.getNewCompetency(userScore)); }
        // else if (this.props.selectedQuiz == QuizConstants.QUIZOPTIONS.VIRTUAL) { this.props.updatecompetencyLevelVirtual(this.getNewCompetency(userScore)); }

        //this.props.updateScore(botsWithScore);
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
        this.botObject &&
            this.props.fetchOpponentScore(this.props.quizId, this.props.token);
    }

    setParameterToShowScore = () => this.setState({ isReviewAnswerClicked: false });

    renderQuizReview = () => {
        this.props.sendScoreToDB(this.state.userScore, this.props.quizData.id, this.props.token);

        if (!this.state.oponentScoreApiCalled) {
            this.setState({ oponentScoreApiCalled: true })
            this.fetchScoreTimeId =setTimeout(() => {
                this.fetchOpponentScore();
            }, 8000);
        }

        return (
            <>
                {this.renderTimer(12, 'Calculating score in', this.setParameterToShowScore)}
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
                </View>
            </>
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
            {/* {this.renderSubmitButton()} */}
        </View>
    )

    getBotObjectFromPairObject = () => {
        return this.props.leaderBoardData.flat().find(bot => bot.studentId == this.props.userOponentId);

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

        if (!this.state.fetchedLeaderfterQuiz) {
            this.props.fetchLeadersBoardAfterQuiz(this.props.quizData.id, this.props.userId, this.props.token);
            this.setState({ fetchedLeaderfterQuiz: true })
        }
        return (
            <>
                <Text style={styles.quizResultLabel}> Quiz Result </Text>
                {this.renderTimer(5, 'Updating LeaderBoard', this.redirectAfterQuiz)}
                <View style={styles.scoreBoxContainer}>
                    <View style={styles.scoreBox}>
                        <Text style={styles.displayScoreText}>{this.props.name}</Text>
                        <Text style={styles.displayScoreText}>{this.state.userScore}/{quizLength}</Text>
                        <Text style={styles.displayScoreText}>Correct</Text>
                    </View>
                    {botObject && <View style={styles.scoreBox}>
                        <Text style={styles.displayScoreText}>{botObject.name}</Text>
                        <Text style={styles.displayScoreText}>{this.props.opponentScore}/{quizLength}</Text>
                        <Text style={styles.displayScoreText}>Correct</Text>
                    </View>}
                </View>
            </>)
    }

    render() {
        this.botObject = this.getBotObjectFromPairObject();

        let comp = this.state.isQuizEnded ?
            (this.state.isReviewAnswerClicked ? this.renderQuizReview() : this.renderScoreBoxContainer(this.botObject)) :
            this.renderQuizSection();

        let isSmall = true;
        let grade, school;
        if (!this.botObject) {
            isSmall = false;
            grade = this.props.grade,
                school = this.props.school
        }

        return (
            <Screen>
                <View style={styles.reviewContainer}>
                    <ScrollView keyboardShouldPersistTaps={'always'}>
                        <View style={styles.userInfoBox}>
                            <StudentInfoDisplay
                                name={this.props.name}
                                grade={grade}
                                school={school}
                                isSmall={isSmall} />
                            {this.botObject && <StudentInfoDisplay
                                name={this.botObject.name}
                                isSmall={isSmall} />}
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
        school: state.login.userData?.schoolName,
        userId: state.login.userData?.userId,
        competencyLevel: state.login.userData?.competencylevelFromAPI,
        quizData: state.scheduleQuiz.currentQuiz?.quizData,
        leaderBoardData: state.scheduleLeaderBoard?.pairingMatrix, //studentId
        userOponentId: state.scheduleLeaderBoard?.userOponentId,
        token: state.login.userData?.token,
        opponentScore: state.scheduleQuiz.opponentScore,
        quizId: state.scheduleQuiz.currentQuiz?.innerQuizId

    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchOpponentScore: function (quizId, token) {
            dispatch(OnlineQuizAction.fetchOpponentScore(quizId, token));
        },
        sendScoreToDB: function (score, quizId, token) {
            dispatch(OnlineQuizAction.sendScoreToDB(score, quizId, token, ownProps.navigation));
        },
        fetchLeadersBoardAfterQuiz: function (quizId, userId, token) {
            dispatch(ScheduleLeaderBoardAction.getLeadersBoardAfterQuiz(quizId, userId, token, ownProps.navigation))
        }
    }
}

let styles = create(OnlineQuizStyles);


export default connect(mapStateToProps, mapDispatchToProps)(OnlineQuizScreen);