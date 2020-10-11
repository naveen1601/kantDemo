import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../../baseComponents/button/Button'
import { View, StyleSheet, Image } from 'react-native';
import LeaderBoardStyles from './LeaderBoardStyles'
import { create } from '../../helpers/PlatformSpecificStyles';
import Text from '../../baseComponents/text/Text';

class LeaderBoard extends Component {

    renderLeaderBoard = () => this.props.leaderBoardMatrix.map((userPair, index) =>
        (<View key={index}>
            {userPair.map(bot => {

                const userBoxStyle = [styles.botContainer];

                (bot.id == 100 || (bot.studentId && (bot.studentId == this.props.userId))) &&
                    userBoxStyle.push(styles.userBox)
                const serialNum = bot.serialNum || bot.sequence;
                (bot.status == 'absent') &&
                    userBoxStyle.push(styles.absentBox)
                isGoingUp = bot.isGoingUp || bot.position == 'up';

                const level = bot.competency || 0;
                const marks = bot.correctAnswer || 0;
                const totalQuiz = bot.totalQuiz || 0;


                return (
                    <View style={userBoxStyle}>
                        <View style={styles.botBox}>
                            <Text style={styles.nameBox}>{serialNum}. {bot.name}</Text>
                            {isGoingUp &&
                                <View style={styles.arrowContainer}>
                                    <Image source={require('../../staticData/assests/upArrow.png')}
                                        style={styles.arrowBox} />
                                </View>
                            }
                            {
                                (bot.status == 'absent') &&
                                <Text>Quit</Text>
                            }

                        </View>
                        {!bot.id &&
                            <View style={styles.infoBox}>
                                <Text style={styles.infoText}>Level: {level}</Text>
                                <Text style={styles.infoText}>Marks: {marks}</Text>
                                <Text style={styles.infoText}>Total Quiz: {totalQuiz}</Text>
                            </View>
                        }
                    </View>
                )
            }

            )}
            <Text></Text>

        </View>)
    )

    render() {
        return (
            <View style={styles.gradeBoxContainer}>
                {this.renderLeaderBoard()}
            </View>
        );
    }
}

LeaderBoard.propTypes = {
    leaderBoardMatrix: PropTypes.array
};

let styles = create(LeaderBoardStyles);

export default LeaderBoard;