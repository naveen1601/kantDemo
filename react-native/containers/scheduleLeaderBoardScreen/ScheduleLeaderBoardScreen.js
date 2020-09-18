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

    async componentDidMount() {
        if (this.state.isQuizEnded) {
            this.currentTime = await getTimeFromApi();
            const currentQuiz = nextQuizData(this.props.quizScheduleList, this.props.currentQuiz.outerQuizId, this.props.currentQuiz.innerQuizId);
            this.props.markAttendanceForNextQuiz(currentQuiz);
            this.startTimerAfterAPIFetch();
            this.setState({
                newQuiz: currentQuiz,
                startTimer: true
            })
        } else {
            this.props.startSpinner();
            this.leaderBoardTimeId = setTimeout(() => {
                this.props.getLeadersBoardBeforeQuiz()
                this.startTimerAfterAPIFetch();
            }, 13000);
        }
    }

    componentWillUnmount() {
        clearTimeout(this.leaderBoardTimeId);
    }

    getTimerForNextQuiz = () => {

        if (!_.isEmpty(this.props.quizId && this.state.newQuiz)) {
            const nextQuizStartTime = moment(this.state.newQuiz?.quizData?.startDate);
            const durationbwStartandCurrent = this.currentTime && moment.duration(nextQuizStartTime.diff(this.currentTime));
            const timeInSeconds = durationbwStartandCurrent && durationbwStartandCurrent.asSeconds();
            if (timeInSeconds == undefined || timeInSeconds <= 0) {
                return 1;
            }
            else {
                return timeInSeconds - 1;
            }
        }
        else return 8;

    }

    startTimerAfterAPIFetch = () => this.setState({ startTimer: true });

    renderNextQuizTextAndTime = () => {
        let quizText = this.state.isQuizEnded ? 'Moving to next Quiz in' : 'Quiz is going to start in';
        const timer = this.state.isQuizEnded ? this.getTimerForNextQuiz() : 8;
        let screenName = this.props.route.params?.isQuizEnded ? Screens.ScheduleLeaderBoardScreen : Screens.OnlineQuizScreen;

        if (_.isEmpty(this.props.quizId)) {
            screenName = Screens.ScheduleQuizScreen;
            quizText = 'Quiz over, exit in '
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
        return (
            <Screen>
                <ScrollView keyboardShouldPersistTaps={'always'}>
                    <View style={styles.leadersBoardContainer}>
                        {this.renderNextQuizTextAndTime()}
                        <LeaderBoard leaderBoardMatrix={this.props.leaderBoardData}
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
        currentQuiz: state.scheduleQuiz?.currentQuiz
    }
}

export const mergeProps = (stateProps, dispatchProps, ownProps) => {

    let actionProps = Object.assign({}, dispatchProps, {
        getLeadersBoardBeforeQuiz: () => {
            dispatchProps.getLeadersBoardBeforeQuiz(stateProps.quizId, stateProps.userId, stateProps.token);
        },
        markAttendanceForNextQuiz: (currentQuiz) => {
            dispatchProps.markAttendanceForNextQuiz(currentQuiz, stateProps.userId, stateProps.token)
        }

    });

    return Object.assign({}, ownProps, stateProps, actionProps);
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getLeadersBoardBeforeQuiz: function (quizId, userId, token) {
            dispatch(ScheduleLeaderBoardAction.getLeadersBoardBeforeQuiz(quizId, userId, token, ownProps.navigation));
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