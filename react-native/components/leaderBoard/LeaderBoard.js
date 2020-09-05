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

                const userContainerStyle = [styles.botBox];

                (bot.id == 100 || (bot.studentId && (bot.studentId == this.props.userId))) &&
                    userContainerStyle.push(styles.userBox)
                const serialNum = bot.serialNum || bot.sequence;
                isGoingUp = bot.isGoingUp || bot.position == 'up';
                return (
                    <View style={userContainerStyle}>
                        <Text style={styles.nameBox}>{serialNum}. {bot.name}</Text>
                        {isGoingUp &&
                            <View style={styles.arrowContainer}>
                                <Image source={require('../../staticData/assests/upArrow.png')}
                                    style={styles.arrowBox} />
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