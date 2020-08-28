import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { create } from '../../helpers/PlatformSpecificStyles';
import DummyUsers from '../../staticData/offlineUsersData.json'
import { randomValueFromArray, randomNumberOfValues } from '../../helpers/CommonHelper';
import Config from '../../Configs';
import { connect } from 'react-redux';
import Text from '../../baseComponents/text/Text';
import LeadersBoardAction from './LeadersBoardActions';
import LeaderBoard from '../../components/leaderBoard/LeaderBoard'
import LeadersBoardScreenStyle from './LeadersBoardScreenStyles';
import AlertInfo from '../../baseComponents/alert/Alert';
import CountDown from 'react-native-countdown-component';
import {Screens, resetScreen} from '../../helpers/ScreenHelpers'
import _ from 'lodash';

class LeadersBoardScreen extends Component {

    constructor(props){
        super(props);
        this.state = {
            botsPair: [],
            evenPairDirection: this.props.evenPairDirection,
            isQuizOver: false,
            isNewPairingRequired: false,
            isReshuffleRequire: false
        };
        let botIdPairedWithUser= ''; 
    }


    componentDidMount() {
        this.setState({
            botsPair: !this.props.isRenderedOnce ?
                this.initialPairingMatrix(true) :
                this.props.leadersBoardData
        });

        //if leaderBoard available means it is rendering second time(after quiz)
        this.props.isRenderedOnce && this.switchUserAfterQuiz_TimeOut();
    }

    onTimeOutNavigateToQuiz=()=>{
        this.props.navigation.replace(Screens.OfflineQuizScreen);
    }

    switchUserAfterQuiz_TimeOut = () => {
        this.setState({
            isQuizOver: true
        });

        setTimeout(() => {
            this.switchUserInsidePairAccordingToScore();
        }, 2000);

        this.createNewPairAfterQuiz_Timeout();
    }

    createNewPairAfterQuiz_Timeout = () => {
        setTimeout(() => {
            this.createNewPairMatrixBasedOnEvenOddParing();
        }, 5000);
    }

    initialPairingMatrix = () => {

        const botsPairFirstTime = this.initializeRandomBotsAndPair();

        const leaderPairData = {
            botsPair: botsPairFirstTime,
            evenPairDirection: true,
            botIdPairedWithUser : this.botIdPairedWithUser
        }
        this.props.saveLeadersBoard(leaderPairData);

        return botsPairFirstTime;
    }

    initializeRandomBotsAndPair = () =>{
        const totalBots = randomValueFromArray(Config.BOTS_NUMBER_ARRAY);        
        let dummyUsers = randomNumberOfValues(DummyUsers, totalBots);
        dummyUsers[Math.floor(dummyUsers.length / 2)] = { id: 100, name: this.props.name, score: 0 };

        return this.createPair(dummyUsers);;
    }

    createPair = users => {
        const pairArray = [];
        users.forEach((element,index) => {
            element.serialNum = index+1;
        });
        let startingBot = this.state.evenPairDirection ? 0 : 1;
        for (startingBot; startingBot < users.length; startingBot += 2) {
            if (!this.state.evenPairDirection && startingBot == 1) {
                pairArray.push([users[0]])
            }
            if (users[startingBot + 1] !== undefined) {
                pairArray.push([users[startingBot], users[startingBot + 1]]);

                if(users[startingBot].id == 100) this.botIdPairedWithUser = users[startingBot + 1].id;
                else if(users[startingBot + 1].id == 100) this.botIdPairedWithUser =  users[startingBot].id;

                
            } else {
                pairArray.push([users[startingBot]]);
            }
        }
        return pairArray;
    }

    switchUserInsidePairAccordingToScore = () => {
        let newPairMatrix = this.state.botsPair.map((userPair, index) => {

            if (userPair.length == 2 && userPair[0].score < userPair[1].score) {
                let tempObj = userPair[0];
                userPair[0] = userPair[1];
                userPair[1] = tempObj;
                userPair[0].isGoingUp = true;
            }
            return userPair;
        });

        this.setState({
            botsPair: newPairMatrix,
            evenPairDirection: !this.state.evenPairDirection,
            isNewPairingRequired: true,
            isQuizOver: false
        })
    }

    createNewPairMatrixBasedOnEvenOddParing = () => {
        let pairArray = [];
        let evenPairDirection = this.state.evenPairDirection;
        let isReshuffleRequire = false;

        this.state.botsPair.map(pair => {
            pair.map(bot => {
                bot.isGoingUp = false;
                pairArray.push(bot)
            });
        });

        const totalParticipantSize = pairArray.length;
        const userIndex = _.findIndex(pairArray, { 'id': 100 });

        //checking user position, if last or first introducing new users.
        if (userIndex == totalParticipantSize - 1 || userIndex == 0){
            pairArray = this.initializeRandomBotsAndPair();
            isReshuffleRequire = true;
        }
        else {
            pairArray = this.createPair(pairArray);
        }
        this.setState({
            botsPair: pairArray,
            isNewPairingRequired: false,
            isReshuffleRequire
        })

        const leaderPairData = {
            botsPair: pairArray,
            evenPairDirection,
            botIdPairedWithUser : this.botIdPairedWithUser
        }
        this.props.saveLeadersBoard(leaderPairData);
    }

    renderNextQuizTextAndTime = () => {
        return (
            <View style={styles.nextQuizTextContainer}>
                <Text style={styles.quizText}>Quiz is going to start in </Text>

                <CountDown
                    until={Config.LEADERBOARD_TIMER}
                    onFinish={this.onTimeOutNavigateToQuiz}
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

    renderBots = () => (
        <View style={styles.leadersBoardContainer}>
            {this.renderNextQuizTextAndTime()}
            {this.state.isQuizOver && !this.state.isNewPairingRequired &&
                <AlertInfo type="alertInfo"
                    message={'Switching users based on quiz result'} />
            }
            {this.state.isNewPairingRequired &&
                <AlertInfo type="alertInfo"
                    message={'Creating new pair for next quiz'} />
            }
            {this.state.isReshuffleRequire &&
                <AlertInfo type="alertInfo"
                    message={'New Participants Joined the Quiz, Quiz Reshuffled'} />
            }
            <LeaderBoard
                leaderBoardMatrix={this.state.botsPair}
            />
        </View>
    )

    render() {
        return (
            <ScrollView keyboardShouldPersistTaps={'always'}>
                {this.renderBots()}
            </ScrollView>
        );
    }
}

const mapStateToProps = state => {
    return {
        name: state.login.userData && state.login.userData.name,
        grade: state.login.userData && state.login.userData.grade,
        score: state.login.userData && state.login.userData.lastScore,
        competencyLevel: state.login.userData && state.login.userData.competencyLevel,
        isLoggedIn: state.login.isLoggedIn,
        leadersBoardData: state.leadersBoard.botsPair,
        evenPairDirection: state.leadersBoard.evenPairDirection,
        isRenderedOnce: state.leadersBoard.isRenderedOnce
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveLeadersBoard: function (leadersBoardData) {
            dispatch(LeadersBoardAction.saveLeadersBoard(leadersBoardData));
        }
    }
}

let styles = create(LeadersBoardScreenStyle);


export default connect(mapStateToProps, mapDispatchToProps)(LeadersBoardScreen);