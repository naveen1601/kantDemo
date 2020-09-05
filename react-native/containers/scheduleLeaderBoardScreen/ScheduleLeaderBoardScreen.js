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
            this.props.markAttendanceForNextQuiz();
            this.startTimerAfterAPIFetch();
        } else {
            this.props.getLeadersBoardBeforeQuiz();
            setTimeout(() => {
                this.props.stopSpinner();
                this.startTimerAfterAPIFetch();
            }, 9000);
        }
    }

    startTimerAfterAPIFetch = () => this.setState({ startTimer: true });

    renderNextQuizTextAndTime = () => {
        let quizText = this.state.isQuizEnded ? 'Moving to next Quiz in' : 'Quiz is going to start in';
        const timer = this.state.isQuizEnded ? 10 : 10;
        let screenName = this.props.route.params?.isQuizEnded? Screens.ScheduleLeaderBoardScreen : Screens.OnlineQuizScreen;
        
        if(_.isEmpty(this.props.quizId)){
            screenName = Screens.ScheduleQuizScreen;
            quizText = 'Quiz over, exit in '
        }
        
        return (
            <View style={styles.nextQuizTextContainer}>
                {this.state.startTimer &&
                    <>
                        <Text style={styles.quizText}>{quizText}</Text>

                        <CountDown
                            //until={Configs.LEADERBOARD_TIMER}
                            until={timer}
                            onFinish={() => this.props.navigation.replace(screenName)}
                            onPress={() => {}}
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
        // getLeadersBoardAfterQuiz: (successCall) => {
        //     dispatchProps.getLeadersBoardAfterQuiz(stateProps.quizId, stateProps.userId, stateProps.token, successCall);
        // },
        markAttendanceForNextQuiz: ()=>{
            dispatchProps.markAttendanceForNextQuiz(stateProps.quizScheduleList, stateProps.currentQuiz, stateProps.userId, stateProps.token)
        }

    });

    return Object.assign({}, ownProps, stateProps, actionProps);
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        // getLeadersBoardAfterQuiz: function (quizId, userId, token, successCall) {
        //     dispatch(ScheduleLeaderBoardAction.getLeadersBoardAfterQuiz(quizId, userId, token, successCall, ownProps.navigation));
        // },
        getLeadersBoardBeforeQuiz: function (quizId, userId, token) {
            dispatch(ScheduleLeaderBoardAction.getLeadersBoardBeforeQuiz(quizId, userId, token, ownProps.navigation));
        },
        stopSpinner: function(){
            dispatch(ScheduleLeaderBoardAction.stopSpinner());
        },
        markAttendanceForNextQuiz: function(quizScheduleList,currentQuiz, userId, token){
            dispatch(ScheduleLeaderBoardAction.markAttendanceForNextQuiz(quizScheduleList, currentQuiz, userId, token, ownProps.navigation))
            
        }


    }
}

let styles = create(ScheduleLeaderBoardStyles);


export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ScheduleLeaderBoardScreen);