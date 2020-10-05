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
import { getTimeFromApi } from '../../helpers/CommonHelper';
import Screen from '../screen/Screen';
import ScheduleLeaderBoardAction from '../scheduleLeaderBoardScreen/ScheduleLeaderBoardAction';

class ScheduleQuizScreen extends Component {
    state = {
        isQuizAvailable: false,
        secondsLeft: 0,
        sequence: 0,
        innerQuizId: '',
        outerQuizId: '',
        innerQuiz: {},
        callAttendance: false,
        callLeaderBoard: false
    };

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('focus', () => {
            this.checkQuizAvailable();
        });
    }

    componentWillUnmount() {
        clearTimeout(this.attendanceTimeOutId);
        clearTimeout(this.leaderBoardTimeOutId);
    }

    checkQuizAvailable = async () => {
        const currentUtcTime = await getTimeFromApi();

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
            if (parseInt(durationbwEndandCurrent.asSeconds()) > 110) { //checking for 1 quiz if endtime of quiz > current time

                const innerQuiz = outerQuiz[i].quizList;
                let j = 0;
                for (; j < innerQuiz.length; j++) {
                    const innerQuizStartTime = moment(innerQuiz[j].startDate);
                    const durationbwStartandCurrent = moment.duration(innerQuizStartTime.diff(currentUtcTime));
                    const differenceInteger = parseInt(durationbwStartandCurrent.asSeconds());
                    if (differenceInteger > 15) {
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
            innerQuiz: nextScheduleQuiz,
            callAttendance: true,
            callLeaderBoard: true
        });
    }

    markAttendance = () => {
        this.props.markAttendanceOfQuiz(this.state.outerQuizId,
            this.state.innerQuizId,
            this.state.sequence, this.state.innerQuiz);
        this.setState({ callAttendance: false })
    }

    renderCountDown = () => {
        const timerValue = parseInt(this.state.secondsLeft);
        //marking attendance
        if (this.state.callAttendance && timerValue > 14 && timerValue <= 30) {
            this.markAttendance();
        } else if (this.state.callAttendance && timerValue > 14) {
            const markAttendanceTime = (timerValue - 30) * 1000;
            this.attendanceTimeOutId = setTimeout(() => {
                //alert('marking Attendance'+markAttendanceTime);
                this.markAttendance();
            }, markAttendanceTime);
        }

        //getting LeadersBoard
        if (this.state.callLeaderBoard && timerValue >= 5) {
            this.leaderBoardTimeOutId = setTimeout(() => {
                this.props.getLeadersBoardBeforeQuiz(this.props.currentQuiz);
                this.setState({ callLeaderBoard: false });
            }, (timerValue - 5) * 1000);
        }

        let comp = this.state.isQuizAvailable ? (
            <View style={styles.timerConatiner}>
                <Text style={styles.quizText}>Quiz will start in </Text>
                <CountDown
                    until={timerValue}
                    onFinish={() => this.props.navigation.replace(Screens.ScheduleLeaderBoardScreen)}
                    // onFinish={() => {}}
                    onPress={() => { }}
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
        const gradeSection = this.props.grade + '' + (this.props.section ? this.props.section : '');
        const rollNumber = this.props.rollNumber ? `Roll No: ${this.props.rollNumber}` : '';
        const compLevel = this.props.isLoggedIn ? this.props.competencylevelFromAPI/10 : '';

        return (
            <Screen>
                <ScrollView keyboardShouldPersistTaps={'always'}>
                    <StudentInfoDisplay name={this.props.name}
                        grade={gradeSection}
                        position={rollNumber}
                        school={this.props.school} 
                        compLevel={compLevel}/>
                    {!!this.props.quizError &&
                        <AlertInfo type="error"
                            message={this.props.quizError} />
                    }
                    {!!this.props.leaderBoardError &&
                        <AlertInfo type="error"
                            message={this.props.leaderBoardError} />
                    }
                    {this.renderCountDown()}
                    {this.renderQuizList()}
                </ScrollView>
            </Screen>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        name: state.login.userData?.name,
        grade: state.login.userData?.grade,
        section: state.login.userData?.section,
        rollNumber: state.login.userData?.rollNumber,
        token: state.login.userData?.token,
        school: state.login.userData?.schoolName,
        quizSchedule: state.scheduleQuiz?.scheduleQuizList,
        quizError: state.scheduleQuiz?.errorMessage,
        userId: state.login.userData?.userId,
        leaderBoardError: state.scheduleLeaderBoard?.errorMessage,
        currentQuiz: state.scheduleQuiz?.currentQuiz,
        isLoggedIn: state.login?.isLoggedIn,
        competencylevelFromAPI: state.login.userData?.competencylevelFromAPI,

    }
}

export const mergeProps = (stateProps, dispatchProps, ownProps) => {

    let actionProps = Object.assign({}, dispatchProps, {
        markAttendanceOfQuiz: (outerQuizId, innerQuizId, sequence, innerQuiz) => {
            dispatchProps.markAttendanceOfQuiz(outerQuizId, innerQuizId, sequence, stateProps.userId, innerQuiz, stateProps.token);
        },
        getLeadersBoardBeforeQuiz: (quizId) => {
            dispatchProps.getLeadersBoardBeforeQuiz(quizId, stateProps.userId, stateProps.token);
        },

    });

    return Object.assign({}, ownProps, stateProps, actionProps);
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        markAttendanceOfQuiz: function (outerQuizId, innerQuizId, sequence, userId, innerQuiz, token) {
            dispatch(ScheduleQuizAction.markAttendanceOfQuiz(outerQuizId, innerQuizId, sequence, userId, innerQuiz, token, ownProps.navigation));
        },
        getLeadersBoardBeforeQuiz: function (quizId, userId, token) {
            dispatch(ScheduleLeaderBoardAction.getLeadersBoardBeforeQuiz(quizId, userId, token, ownProps.navigation));
        },

    }
}

let styles = create(ScheduleQuizStyles);


export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ScheduleQuizScreen);