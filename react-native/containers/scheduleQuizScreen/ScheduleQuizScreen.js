import React, { Component } from 'react';
import {
    View,
    ScrollView
} from 'react-native';
import { create } from '../../helpers/PlatformSpecificStyles';
import StudentInfoDisplay from '../../components/studentInfoDisplay/StudentInfoDisplay';
import { connect } from 'react-redux';
import ScheduleQuizAction from './ScheduleQuizAction';
import AlertInfo from '../../baseComponents/alert/Alert';
import ScheduleQuizStyles from './ScheduleQuizStyles';
import QuizInfo from '../../components/quizInfo/QuizInfo';
import CountDown from 'react-native-countdown-component';
import moment from 'moment'
import Text from '../../baseComponents/text/Text'

class QuizOptionScreen extends Component {
    state = {
        isQuizAvailable: false,
        secondsLeft: 0,
        sequence: 0,
        innerQuizId: '',
        outerQuizId: ''
    };

    componentDidMount() {
        this.checkQuizAvailable();
    }


    checkQuizAvailable = () => {
        const currentUtcTime = new moment.utc();
        const outerQuiz = this.props.quizSchedule;
        let i = outerQuiz?.length - 1;
        let secondsLeft = 0;
        let innerQuizId = '';
        let outerQuizId = '';
        let sequence = 0;
        let isQuizAvailable = false

        for (; i >= 0; i--) {
            const quizEndTime = moment.utc(outerQuiz[i].endDate);
            const durationbwEndandCurrent = moment.duration(quizEndTime.diff(currentUtcTime));
            if (parseInt(durationbwEndandCurrent.asSeconds()) > 45) { //checking for 1 quiz if endtime of quiz > current time

                const innerQuiz = outerQuiz[i].quizList;
                let j = 0;
                for (; j < innerQuiz.length; j++) {
                    const innerQuizStartTime = moment.utc(innerQuiz[j].startDate);
                    const durationbwStartandCurrent = moment.duration(currentUtcTime.diff(innerQuizStartTime));
                    const differenceInteger = parseInt(durationbwEndandCurrent.asSeconds());
                    if (parseInt(durationbwEndandCurrent.asSeconds()) > 2) {
                        secondsLeft = differenceInteger;
                        innerQuizId = innerQuiz[j].id;
                        outerQuizId = innerQuiz[j].quizSchedule;
                        isQuizAvailable = true;
                        sequence = innerQuiz[j].sequence_value;
                        // alert(innerQuizStartTime);
                        break;
                    }
                }
                if (isQuizAvailable) break;
            }
        }

        isQuizAvailable && this.setState({
            secondsLeft,
            innerQuizId,
            outerQuizId,
            sequence,
            isQuizAvailable
        });
    }

    startQuiz = () => {
        this.props.updateQuizSelection(this.state.outerQuizId,
            this.state.innerQuizId,
            this.state.sequence);
    }

    renderCountDown = () => {
        let countComp = (
            <View style={styles.timerConatiner}>
                <Text style={styles.quizText}>Quiz will start in </Text>
                <CountDown
                    until={this.state.secondsLeft}
                    onFinish={() => { }}
                    onPress={this.startQuiz}
                    digitStyle={{ backgroundColor: '#FFF', borderWidth: 1, borderColor: '#255166' }}
                    digitTxtStyle={{ color: '#255166' }}
                    separatorStyle={{ color: '#255166', paddingBottom: 25 }}
                    showSeparator
                    size={25}
                />
            </View >
        );

        let notFoundComp = ( <View style={styles.alertContainer}><AlertInfo type="alertInfo"
            message={'No Active Quiz Found'} /> 
            </View>);

        let comp = this.state.isQuizAvailable ? countComp : notFoundComp;

        return comp;
    }

    renderQuizList = () => (
        <View>
            {this.props.quizSchedule.map(item => <QuizInfo
                quizDetail={item}
            // onPress={(quizId) => this.props.updateQuizSelection(quizId)} 
            />)}
        </View>
    )

    render() {
       
        return (
            <ScrollView keyboardShouldPersistTaps={'always'}>
                {!!this.props.quizError &&
                    <AlertInfo type="error"
                        message={this.props.quizError} />
                }
                {this.renderCountDown()}
                {this.renderQuizList()}
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        name: state.login.userData?.name,
        grade: state.login.userData?.grade,
        section: state.login.userData?.section,
        token: state.login.userData?.token,
        school: state.login.userData?.schoolName,
        quizSchedule: state.scheduleQuiz?.scheduleQuizList,
        quizError: state.scheduleQuiz?.errorMessage
    }
}

export const mergeProps = (stateProps, dispatchProps, ownProps) => {

    let actionProps = Object.assign({}, dispatchProps, {
        updateQuizSelection: (outerQuizId, innerQuizId, sequence) => {
            dispatchProps.updateQuizSelection(outerQuizId, innerQuizId, sequence, stateProps.token);
        },
        getQuizList: (successCallback) => {
            dispatchProps.getQuizList(successCallback, stateProps.token);
        }

    });

    return Object.assign({}, ownProps, stateProps, actionProps);
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getQuizList: function (successCallback, token) {
            dispatch(ScheduleQuizAction.getQuizList(successCallback, token, ownProps.navigation));
        },
        updateQuizSelection: function (outerQuizId, innerQuizId, sequence, token) {
            dispatch(ScheduleQuizAction.updateQuizSelection(outerQuizId, innerQuizId, sequence, token, ownProps.navigation));
        }

    }
}

let styles = create(ScheduleQuizStyles);


export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(QuizOptionScreen);