import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { create } from '../../helpers/PlatformSpecificStyles';
import Button from '../../baseComponents/button/Button';
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
import {Screens, resetScreen} from '../../helpers/screenHelpers'

class LeadersBoardScreen extends Component {

    constructor(props){
        super(props);
        this.state = {
            botsPair: [],
            evenPairDirection: this.props.evenPairDirection,
            quizOver: false,
            newPairingRequired: false,
        };
        let botNamePairedWithUser= ''; 
    }


    componentDidMount() {
        const totalBots = randomValueFromArray(Config.BOTS_NUMBER_ARRAY);
        this.setState({
            botsPair: !this.props.isRenderedOnce ?
                this.initialPairingMatrix(randomNumberOfValues(DummyUsers, totalBots)) :
                this.props.leadersBoardData
        });

        //if leaderBoard available means it is rendering second time(after quiz)
        this.props.isRenderedOnce && this.switchUserAfterQuiz_TimeOut();
    }

    onTimeOutNavigateToQuiz=()=>{
        resetScreen(this.props.navigation,Screens.OfflineQuizScreen);          
        // this.props.navigation.push(Screens.OfflineQuizScreen);
    }

    switchUserAfterQuiz_TimeOut = () => {
        this.setState({
            quizOver: true
        });

        setTimeout(() => {
            this.switchUserInsidePairAccordingToScore();
        }, 2000);

        this.createNewPairAfterQuiz_Timeout();
    }

    createNewPairAfterQuiz_Timeout = () => {
        setTimeout(() => {
            this.createNewPairMatrixBasedOnScore();
        }, 3000);
    }



    initialPairingMatrix = (dummyUsers) => {
        dummyUsers[Math.floor(dummyUsers.length / 2)] = { id: 100, name: this.props.name, score: 0 };

        const botsPairFirstTime = this.createPair(dummyUsers);;

        const leaderPairData = {
            botsPair: botsPairFirstTime,
            evenPairDirection: this.props.evenPairDirection,
            botNamePairedWithUser : this.botNamePairedWithUser
        }
        this.props.saveLeadersBoard(leaderPairData);

        return botsPairFirstTime;

    }

    createPair = users => {
        const pairArray = [];
        let startingBot = this.state.evenPairDirection ? 0 : 1;
        for (startingBot; startingBot < users.length; startingBot += 2) {
            if (!this.state.evenPairDirection && startingBot == 1) {
                pairArray.push([users[0]])
            }
            if (users[startingBot + 1] !== undefined) {
                pairArray.push([users[startingBot], users[startingBot + 1]]);

                if(users[startingBot].id == 100) this.botNamePairedWithUser = users[startingBot + 1].name;
                else if(users[startingBot + 1].id == 100) this.botNamePairedWithUser =  users[startingBot].name;

                
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
            }
            return userPair;
        });

        this.setState({
            botsPair: newPairMatrix,
            evenPairDirection: !this.state.evenPairDirection,
            newPairingRequired: true,
            quizOver: false
        })
    }

    createNewPairMatrixBasedOnScore = () => {
        let pairArray = [];
        this.state.botsPair.map(pair => {
            pair.map(bot => pairArray.push(bot));
        });
        pairArray = this.createPair(pairArray);
        this.setState({
            botsPair: pairArray,
            newPairingRequired: false
        })
        const leaderPairData = {
            botsPair: pairArray,
            evenPairDirection: this.state.evenPairDirection,
            botNamePairedWithUser : this.botNamePairedWithUser
        }
        this.props.saveLeadersBoard(leaderPairData);
    }

    renderNextQuizTextAndTime = () => {
        return (
            <View style={styles.nextQuizTextContainer}>
                <Text style={styles.quizText}>Quiz is going to start in </Text>

                <CountDown
                    until={4}
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
            {this.state.quizOver && !this.state.newPairingRequired &&
                <AlertInfo type="alertInfo"
                    message={'Switching users based on quiz result'} />

            }
            {this.state.newPairingRequired &&
                <AlertInfo type="alertInfo"
                    message={'Creating new pair for next quiz'} />
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