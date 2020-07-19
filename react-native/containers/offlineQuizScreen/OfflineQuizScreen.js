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
import QuestionBank from '../../QuestionBank';
import _ from 'lodash'
import StudentInfoDisplay from '../../components/studentInfoDisplay/StudentInfoDisplay';

class OfflineQuizScreen extends Component {
    state = {
        isAnswerEmpty: false,
        test: QuestionBank.Test1.map((item, index) => ({ ...item, index, showEmptyWarning: false, userAnswer: "" })),
        currentQuestionIndex: 0,
        isQuizEndded: false
    }

    handleUserInput = ({ userAnswer, key }) => {
        let questionWithUserInput = this.state.test;
        questionWithUserInput[key].userAnswer = userAnswer
        this.setState({
            test: questionWithUserInput
        })
    }

    renderQuestionAndAnswer = () => {
        const currentQuestion = this.state.currentQuestionIndex < this.state.test.length &&
            this.state.test[this.state.currentQuestionIndex];

        return currentQuestion && (<QuestionAnswer
            question={currentQuestion.ques}
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
        return (this.state.currentQuestionIndex < this.state.test.length - 1) && (
            <View>
                <FlatButton
                    onPress={this.renderNextQuestion}
                    text={'Next'}
                />
            </View>
        )
    }

    submitQuiz = () => this.setState({ isQuizEndded: true })

    showEmptyBoxWarning = () => {
        let testWithUserInput = this.state.test;
        testWithUserInput[this.state.currentQuestionIndex].showEmptyWarning = true
        this.setState({
            test: testWithUserInput
        })
    }

    hideEmptyBoxWarning = () => {
        let testWithUserInput = this.state.test;

        if (testWithUserInput[this.state.currentQuestionIndex].userAnswer &&
            testWithUserInput[this.state.currentQuestionIndex].showEmptyWarning) {

            testWithUserInput[this.state.currentQuestionIndex].showEmptyWarning = false;
            this.setState({
                test: testWithUserInput
            })
        }
    }

    renderSubmitButton = () => {
        const isLastQuestion = !(this.state.currentQuestionIndex < this.state.test.length - 1);
        const buttonText = isLastQuestion ? "Submit Quiz" : "Submit Answer";
        const onSubmitAns = () => {
            if (this.state.test[this.state.currentQuestionIndex].userAnswer != "") {
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

    renderResultSection = () => {
        return this.state.test.map((item) => (
            <View>
                <Text>{item.ques}</Text>
                <Text>{item.ans}</Text>
                <Text>{item.userAnswer}</Text>
            </View>
        ))
    }

    renderQuizSection = () =>(
        <View>
            <CountDown
                until={30 * 60}
                onFinish={this.submitQuiz}
                onPress={()=>{}}
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
                <Text style={styles.questionNumberDisplay}>Que. {this.state.currentQuestionIndex + 1} of {this.state.test.length} </Text>
                {this.renderNextButton()}
            </View>

            {this.renderSubmitButton()}
        </View>
    )

    render() {
        const comp = this.state.isQuizEndded ? this.renderResultSection() : this.renderQuizSection();
        return (
            <ScrollView keyboardShouldPersistTaps={'always'}>
                <View style={styles.userInfoBox}>
                    <StudentInfoDisplay
                        name={this.props.name}
                        grade={this.props.grade}
                        school={this.props.school}/>
                    {/* <StudentInfoDisplay
                    name={this.props.name}
                    grade={this.props.grade}
                    school={this.props.school}/> */}
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
        isLoggedIn: state.login.isLoggedIn
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