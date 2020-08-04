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
import { AllCompetencyArray, randomNumberBetweenTwoNum } from '../../helpers/CommonHelper';
import { findQuestionsForQuiz } from '../../helpers/QuizSetup';
import {Screens, resetScreen} from '../../helpers/screenHelpers';


class OfflineQuizScreen extends Component {
    

    constructor(props){
        super(props);
        this.state = {
            isAnswerEmpty: false,
            quiz: findQuestionsForQuiz(this.props.competencyLevel, randomNumberBetweenTwoNum(6, 10))
                .map((item, index) =>
                    ({ ...item, index, showEmptyWarning: false, userAnswer: '', isUserAnswerCorrect: false })),
            currentQuestionIndex: 0,
            isQuizEnded: false,
            isReviewAnswerClicked: false
        };
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
        this.setState({
            isQuizEnded: true,
            quiz: quizWithAns
        })
    }

    compareAnswer = (correctAns, userAns) => {
        if (_.isEmpty(userAns)) return false;
        let systemAns = String(correctAns).trim().split(' ').join('').toLowerCase();
        let userInput = String(userAns).trim().split(' ').join('').toLowerCase();

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

    showEmptyBoxWarning = () => {
        let quizWithUserInput = this.state.quiz;
        quizWithUserInput[this.state.currentQuestionIndex].showEmptyWarning = true
        this.setState({
            quiz: quizWithUserInput
        })
    }

    hideEmptyBoxWarning = () => {
        let quizWithUserInput = this.state.quiz;

        if (quizWithUserInput[this.state.currentQuestionIndex].userAnswer &&
            quizWithUserInput[this.state.currentQuestionIndex].showEmptyWarning) {

            quizWithUserInput[this.state.currentQuestionIndex].showEmptyWarning = false;
            this.setState({
                quiz: quizWithUserInput
            })
        }
    }

    renderSubmitButton = () => {
        const isLastQuestion = !(this.state.currentQuestionIndex < this.state.quiz.length - 1);
        const buttonText = isLastQuestion ? "Submit Quiz" : "Submit Answer";
        const onSubmitAns = () => {
            if (this.state.quiz[this.state.currentQuestionIndex].userAnswer != "") {
                this.hideEmptyBoxWarning();
                this.renderNextQuestion();
            }
            else {
                this.showEmptyBoxWarning();
            }
        };
        const onSubmit = isLastQuestion ? this.submitQuiz : onSubmitAns.bind(this);

        return (
            <Button
                onPress={onSubmit}
                text={buttonText}
            />
        );

    }

    renderNextQuestion = () => {
        this.hideEmptyBoxWarning();
        this.setState({ currentQuestionIndex: ++this.state.currentQuestionIndex });
    }

    renderPreviousQuestion = () => {
        this.hideEmptyBoxWarning();
        this.setState({ currentQuestionIndex: --this.state.currentQuestionIndex });
    }

    renderQuizReview = () => {
        return (
            <View>
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
                <Button
                    onPress={() => resetScreen(this.props.navigation,Screens.LeadersBoardScreen)}
                    text={'See Leaders Board'} />
            </View>
        )
    }

    renderQuizSection = () => (
        <View>
            <CountDown
                until={5}
                onFinish={this.submitQuiz}
                onPress={() => { }}
                timeToShow={['M', 'S']}
                digitStyle={{ backgroundColor: '#FFF', borderWidth: 1, borderColor: '#255166' }}
                digitTxtStyle={{ color: '#255166' }}
                //timeLabelStyle={{color: 'red', fontWeight: 'bold'}}
                separatorStyle={{ color: '#255166', paddingBottom: 25 }}
                showSeparator
                size={30}
            />
            {this.renderQuestionAndAnswer()}
            <View style={styles.switchQuestionSection}>
                {this.renderPreviousButton()}
                <Text style={styles.questionNumberDisplay}>Que. {this.state.currentQuestionIndex + 1} of {this.state.quiz.length} </Text>
                {this.renderNextButton()}
            </View>

            {this.renderSubmitButton()}
        </View>
    )

    renderScoreBoxContainer = () => {
        const score = this.state.quiz.filter(item => item.isUserAnswerCorrect).length;
        return (
            <>
                <Text style={styles.quizResultLabel}> Quiz Result </Text>
                <View style={styles.scoreBoxContainer}>
                    <View style={styles.scoreBox}>
                        <Text style={styles.displayScoreText}>{this.props.name}</Text>
                        <Text style={styles.displayScoreText}>{score}/{this.state.quiz.length}</Text>
                        <Text style={styles.displayScoreText}>Correct</Text>
                    </View>
                    <View style={styles.scoreBox}>
                        <Text style={styles.displayScoreText}>{this.props.botNamePairedWithUser}</Text>
                        <Text style={styles.displayScoreText}>2/{this.state.quiz.length}</Text>
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
        const comp = this.state.isQuizEnded ?
            (this.state.isReviewAnswerClicked ? this.renderQuizReview() : this.renderScoreBoxContainer()) :
            this.renderQuizSection();
        //const comp = this.renderQuizReview();

        return (
            <ScrollView keyboardShouldPersistTaps={'always'}>
                <View style={styles.userInfoBox}>
                    <StudentInfoDisplay
                        name={this.props.name}
                        grade={this.props.grade}
                        school={this.props.school}
                        isSmall />
                    <StudentInfoDisplay
                        name={this.props.botNamePairedWithUser}
                        grade={this.props.grade}
                        school={this.props.school}
                        isSmall />
                </View>
                <View style={styles.OfflineQuizScreen}>
                    {comp}
                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = state => {
    return {
        name: state.login.userData && state.login.userData.name,
        grade: state.login.userData && state.login.userData.grade,
        school: state.login.userData && state.login.userData.school,
        competencyLevel: state.login.userData && state.login.userData.competencyLevel,
        isLoggedIn: state.login.isLoggedIn,
        botNamePairedWithUser: state.leadersBoard.botNamePairedWithUser,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch1: () => {
            //dispatch(actionCreator)
        }
    }
}

let styles = create(OfflineQuizScreenStyles);


export default connect(mapStateToProps, mapDispatchToProps)(OfflineQuizScreen);