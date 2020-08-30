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

class ScheduleLeaderBoardScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isQuizEnded: this.props.route.params?.isQuizEnded,
            startTimer: false,
        };
    }
    componentDidMount() {
        if (this.state.isQuizEnded) {
            this.props.getLeadersBoardAfterQuiz(this.startTimerAfterAPIFetch);
        } else {
            this.props.getLeadersBoardBeforeQuiz(this.startTimerAfterAPIFetch);
        }
    }

    startTimerAfterAPIFetch = () => this.setState({ startTimer: true });

    renderNextQuizTextAndTime = () => {
        const quizText = this.state.isQuizEnded ? 'Moving to schedule page in' : 'Quiz is going to start in';
        const timer = this.state.isQuizEnded ? 5 : 5;
        const screenName = this.state.isQuizEnded ? Screens.ScheduleQuizScreen : Screens.OnlineQuizScreen;
        return (
            <View style={styles.nextQuizTextContainer}>
                {this.state.startTimer &&
                    <>
                        <Text style={styles.quizText}>{quizText}</Text>

                        <CountDown
                            //until={Configs.LEADERBOARD_TIMER}
                            until={timer}
                            onFinish={() => this.props.navigation.replace(screenName)}
                            onPress={() => this.props.navigation.replace(screenName)}
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
            <ScrollView keyboardShouldPersistTaps={'always'}>
                <View style={styles.leadersBoardContainer}>
                    {this.renderNextQuizTextAndTime()}
                    <LeaderBoard leaderBoardMatrix={this.props.leaderBoardData}
                        userId={this.props.userId} />

                </View>
            </ScrollView>
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
        errorMessage: state.scheduleLeaderBoard?.errorMessage
    }
}

export const mergeProps = (stateProps, dispatchProps, ownProps) => {

    let actionProps = Object.assign({}, dispatchProps, {
        getLeadersBoardBeforeQuiz: (successCall) => {
            dispatchProps.getLeadersBoardBeforeQuiz(stateProps.quizId, stateProps.userId, stateProps.token, successCall);
        },
        getLeadersBoardAfterQuiz: (successCall) => {
            dispatchProps.getLeadersBoardAfterQuiz(stateProps.quizId, stateProps.userId, stateProps.token, successCall);
        }

    });

    return Object.assign({}, ownProps, stateProps, actionProps);
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getLeadersBoardAfterQuiz: function (quizId, userId, token, successCall) {
            dispatch(ScheduleLeaderBoardAction.getLeadersBoardAfterQuiz(quizId, userId, token, successCall, ownProps.navigation));
        },
        getLeadersBoardBeforeQuiz: function (quizId, userId, token, successCall) {
            dispatch(ScheduleLeaderBoardAction.getLeadersBoardBeforeQuiz(quizId, userId, token, successCall, ownProps.navigation));
        }

    }
}

let styles = create(ScheduleLeaderBoardStyles);


export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ScheduleLeaderBoardScreen);