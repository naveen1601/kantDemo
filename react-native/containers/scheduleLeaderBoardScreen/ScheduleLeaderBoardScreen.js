import React, { Component } from 'react';
import {
    View,
    ScrollView
} from 'react-native';
import { create } from '../../helpers/PlatformSpecificStyles';
import ScheduleLeaderBoardStyles from './ScheduleLeaderBoardStyles';
import { connect } from 'react-redux';
import Text from '../../baseComponents/text/Text';
import ScheduleLeaderBoardAction from './ScheduleLeaderBoardAction';
import LeaderBoard from '../../components/leaderBoard/LeaderBoard';
import Configs from '../../Configs';
import CountDown from 'react-native-countdown-component';
import { Screens } from '../../helpers/ScreenHelpers';
import _ from 'lodash';
import { getTimeFromApi, nextQuizData } from '../../helpers/CommonHelper';
import moment from 'moment';
import Screen from '../screen/Screen';

class ScheduleLeaderBoardScreen extends Component {

    state = {
        isQuizEnded: this.props.route.params?.isQuizEnded,
        startTimer: false,
        calculatedTimeForNextQuiz: false,
        newQuiz: null
    }
    currentTime = moment();

    quizSequence = (this.props.currentQuiz?.quizData?.sequence_value % 2 == 0) ? 'Even First Pair' : 'Odd First Pair'


    async componentDidMount() {
        if (this.state.isQuizEnded) {
            this.currentTime = await getTimeFromApi();
            //console.log(this.props.quizScheduleList);
            this.nextQuiz = nextQuizData(this.props.quizScheduleList, this.props.currentQuiz.outerQuizId, this.props.currentQuiz.innerQuizId);
            // console.log('curr '+this.props.currentQuiz);

            // console.log('nextQuiz '+this.nextQuiz);

            //this.props.markAttendanceForNextQuiz(this.nextQuiz);
            this.setState({
                newQuiz: this.nextQuiz,
                startTimer: true
            })
        } else {
            this.startTimerAfterAPIFetch();
        }
    }

    componentWillUnmount() {
        clearTimeout(this.leaderBoardTimeId);
    }

    getTimerForNextQuiz = () => {

        if (!_.isEmpty(this.props.quizId && this.state.newQuiz?.innerQuizId)) {
            const nextQuizStartTime = moment(this.state.newQuiz?.quizData?.startDate);
            const durationbwStartandCurrent = this.currentTime && moment.duration(nextQuizStartTime.diff(this.currentTime));
            const timeInSeconds = durationbwStartandCurrent && durationbwStartandCurrent.asSeconds();
            let msg = 'nextQuDiff ' + timeInSeconds
            // alert(msg)
            console.log(msg)
            this.leaderBoardTimeId = setTimeout(() => {
                this.props.getLeadersBoardBeforeQuiz(this.nextQuiz)
            }, (timeInSeconds - 5) * 1000);

            if (timeInSeconds == undefined || timeInSeconds <= 1) {
                return 2;
            }
            else {
                return timeInSeconds - 1;
            }
        }
        else return 7;

    }

    startTimerAfterAPIFetch = () => this.setState({ startTimer: true });

    renderNextQuizTextAndTime = () => {
        let quizText = ''
        let timer = 0
        let screenName = ''

        if (this.state.isQuizEnded && !_.isEmpty(this.props.quizId)) {
            quizText = 'Leaderboard-Result';
            timer = this.getTimerForNextQuiz();
            screenName = Screens.ScheduleLeaderBoardScreen;
        }
        else {
            quizText = 'Leaderboard-Pair';
            timer = 7;
            screenName = Screens.OnlineQuizScreen;
        }

        if (this.state.isQuizEnded && !this.state.newQuiz?.innerQuizId) {
            quizText = 'Quiz over, exit in '
            screenName = Screens.ScheduleQuizScreen;
        }

        return (
            <View style={styles.nextQuizTextContainer}>
                {this.state.startTimer && (this.state.isQuizEnded ? this.state.newQuiz : true) &&
                    <>
                        <Text style={styles.quizText}>{quizText}</Text>
                        <CountDown
                            //until={Configs.LEADERBOARD_TIMER}
                            until={timer}
                            onFinish={() => this.props.navigation.replace(screenName)}
                            onPress={() => { }}
                            timeToShow={['S']}
                            digitStyle={{ backgroundColor: '#FFF' }}
                            digitTxtStyle={{ color: '#255166' }}
                            separatorStyle={{ color: '#255166', paddingBottom: 25 }}
                            showSeparator
                            size={20}
                        />
                    </>}
            </View>
        )
    }

    render() {
        const leaderBoardData = this.state.isQuizEnded ? this.props.leaderBoardDataFinal : this.props.leaderBoardData;
        return (
            <Screen>
                <ScrollView keyboardShouldPersistTaps={'always'}>
                <View><Text style={styles.displaySequenceText}>{this.quizSequence}</Text></View>
                    <View style={styles.leadersBoardContainer}>
                        {this.renderNextQuizTextAndTime()}
                        <LeaderBoard leaderBoardMatrix={leaderBoardData}
                            userId={this.props.userId} />
                    </View>
                </ScrollView>
            </Screen>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        name: state.login.userData?.name,
        userId: state.login.userData?.userId,
        token: state.login.userData?.token,
        quizId: state.scheduleQuiz.currentQuiz?.innerQuizId,
        leaderBoardData: state.scheduleLeaderBoard?.pairingMatrix,
        errorMessage: state.scheduleLeaderBoard?.errorMessage,
        quizScheduleList: state.scheduleQuiz?.scheduleQuizList,
        currentQuiz: state.scheduleQuiz?.currentQuiz,
        leaderBoardDataFinal: state.scheduleLeaderBoard?.pairingMatrixFinal
    }
}

export const mergeProps = (stateProps, dispatchProps, ownProps) => {

    let actionProps = Object.assign({}, dispatchProps, {
        getLeadersBoardBeforeQuiz: (nextQuiz) => {
            dispatchProps.getLeadersBoardBeforeQuiz(nextQuiz, stateProps.userId, stateProps.token);
        },
        markAttendanceForNextQuiz: (currentQuiz) => {
            dispatchProps.markAttendanceForNextQuiz(currentQuiz, stateProps.userId, stateProps.token)
        }

    });

    return Object.assign({}, ownProps, stateProps, actionProps);
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getLeadersBoardBeforeQuiz: function (nextQuiz, userId, token) {
            dispatch(ScheduleLeaderBoardAction.getLeadersBoardBeforeQuiz(nextQuiz, userId, token, ownProps.navigation));
        },
        stopSpinner: function () {
            dispatch(ScheduleLeaderBoardAction.stopSpinner());
        },
        startSpinner: function () {
            dispatch(ScheduleLeaderBoardAction.startSpinner());
        },
        markAttendanceForNextQuiz: function (currentQuiz, userId, token) {
            dispatch(ScheduleLeaderBoardAction.markAttendanceForNextQuiz(currentQuiz, userId, token, ownProps.navigation))

        }


    }
}

let styles = create(ScheduleLeaderBoardStyles);


export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ScheduleLeaderBoardScreen);