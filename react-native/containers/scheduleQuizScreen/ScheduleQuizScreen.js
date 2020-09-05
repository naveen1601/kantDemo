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
import { Screens } from '../../helpers/ScreenHelpers';

class ScheduleQuizScreen extends Component {
    state = {
        isQuizAvailable: false,
        secondsLeft: 0,
        sequence: 0,
        innerQuizId: '',
        outerQuizId: '',
        innerQuiz: {}
    };

    componentDidMount() {
        this.checkQuizAvailable();
    }

    checkQuizAvailable = () => {
        const currentUtcTime = new moment();
        const outerQuiz = this.props.quizSchedule;
        let i = outerQuiz?.length - 1;
        let secondsLeft = 0;
        let innerQuizId = '';
        let outerQuizId = '';
        let sequence = 0;
        let isQuizAvailable = false
        let nextScheduleQuiz = {}

        for (; i >= 0; i--) {
            const quizEndTime = moment(outerQuiz[i].endDate);
            const durationbwEndandCurrent = moment.duration(quizEndTime.diff(currentUtcTime));
            if (parseInt(durationbwEndandCurrent.asSeconds()) > 45) { //checking for 1 quiz if endtime of quiz > current time

                const innerQuiz = outerQuiz[i].quizList;
                let j = 0;
                for (; j < innerQuiz.length; j++) {
                    const innerQuizStartTime = moment(innerQuiz[j].startDate);
                    const durationbwStartandCurrent = moment.duration(innerQuizStartTime.diff(currentUtcTime));
                    const differenceInteger = parseInt(durationbwStartandCurrent.asSeconds());
                    if (differenceInteger > 2) {
                        nextScheduleQuiz = innerQuiz[j];
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
            isQuizAvailable,
            innerQuiz: nextScheduleQuiz
        });
    }

    startQuiz = () => {
        this.props.markAttendanceOfQuiz(this.state.outerQuizId,
            this.state.innerQuizId,
            this.state.sequence, this.state.innerQuiz);
    }

    renderCountDown = () => {
        const timerValue = parseInt(this.state.secondsLeft);
        if (this.state.isQuizAvailable && timerValue>0 && timerValue<= 30) {
            this.startQuiz();
        } else if (this.state.isQuizAvailable && timerValue>0){
            setTimeout(() => {
                this.startQuiz();
            }, (timerValue-30)*1000);
        }
        let comp = this.state.isQuizAvailable ? (
            <View style={styles.timerConatiner}>
                <Text style={styles.quizText}>Quiz will start in </Text>
                <CountDown
                    until={timerValue}
                    onFinish={()=>this.props.navigation.replace(Screens.ScheduleLeaderBoardScreen)}
                    onPress={()=>{}}
                    digitStyle={{ backgroundColor: '#FFF', borderWidth: 1, borderColor: '#255166' }}
                    digitTxtStyle={{ color: '#255166' }}
                    separatorStyle={{ color: '#255166', paddingBottom: 25 }}
                    showSeparator
                    size={25}
                />
            </View >
        ) :
            (<View style={styles.alertContainer}><AlertInfo type="alertInfo"
                message={'No Active Quiz Found'} />
            </View>);

        return comp;
    }

    renderQuizList = () => (
        <View>
            {this.props.quizSchedule.map(item => <QuizInfo
                quizDetail={item}
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
        quizError: state.scheduleQuiz?.errorMessage,
        userId: state.login.userData?.userId
    }
}

export const mergeProps = (stateProps, dispatchProps, ownProps) => {

    let actionProps = Object.assign({}, dispatchProps, {
        markAttendanceOfQuiz: (outerQuizId, innerQuizId, sequence, innerQuiz) => {
            dispatchProps.markAttendanceOfQuiz(outerQuizId, innerQuizId, sequence, stateProps.userId, innerQuiz, stateProps.token);
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
        markAttendanceOfQuiz: function (outerQuizId, innerQuizId, sequence, userId, innerQuiz, token) {
            dispatch(ScheduleQuizAction.markAttendanceOfQuiz(outerQuizId, innerQuizId, sequence, userId, innerQuiz, token, ownProps.navigation));
        }

    }
}

let styles = create(ScheduleQuizStyles);


export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ScheduleQuizScreen);