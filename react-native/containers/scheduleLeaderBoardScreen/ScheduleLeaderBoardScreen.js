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


class ScheduleLeaderBoardScreen extends Component {
    
    state = {

        };
    


    componentDidMount() {
        this.props.getLeadersBoardBeforeQuiz();
    }

    render() {
        return (
            <ScrollView keyboardShouldPersistTaps={'always'}>
                <Text>Leaders Board Page</Text>
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        name: state.login.userData?.name,
        id: state.login.userData?.id,
        token: state.login.userData?.token,
        quizId: state.scheduleQuiz.currentQuiz?.innerQuizId
        //quizError: state.ScheduleLeaderBoard?.errorMessage
    }
}

export const mergeProps = (stateProps, dispatchProps, ownProps) => {

    let actionProps = Object.assign({}, dispatchProps, {
        getLeadersBoardBeforeQuiz: () => {
            dispatchProps.getLeadersBoardBeforeQuiz( stateProps.quizId, stateProps.token);
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
            dispatch(ScheduleLeaderBoardAction.getLeadersBoardBeforeQuiz( quizId, token,  ownProps.navigation));
        }

    }
}

let styles = create(ScheduleLeaderBoardStyles);


export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ScheduleLeaderBoardScreen);