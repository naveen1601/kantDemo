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

class ScheduleLeaderBoardScreen extends Component {

    state = {

    };

    componentDidMount() {
        this.props.getLeadersBoardBeforeQuiz();
    }

    renderNextQuizTextAndTime = () => {
        return (
            <View style={styles.nextQuizTextContainer}>
                <Text style={styles.quizText}>Quiz is going to start in </Text>

                <CountDown
                    until={Configs.LEADERBOARD_TIMER}
                    onFinish={() => { }}
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
        getLeadersBoardBeforeQuiz: () => {
            dispatchProps.getLeadersBoardBeforeQuiz(stateProps.quizId, stateProps.token);
        },
        // getQuizList: (successCallback) => {
        //     dispatchProps.getQuizList(successCallback, stateProps.token);
        // }

    });

    return Object.assign({}, ownProps, stateProps, actionProps);
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        // getQuizList: function (successCallback, token) {
        //     dispatch(ScheduleLeaderBoardAction.getQuizList(successCallback, token, ownProps.navigation));
        // },
        getLeadersBoardBeforeQuiz: function (quizId, token) {
            dispatch(ScheduleLeaderBoardAction.getLeadersBoardBeforeQuiz(quizId, token, ownProps.navigation));
        }

    }
}

let styles = create(ScheduleLeaderBoardStyles);


export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ScheduleLeaderBoardScreen);