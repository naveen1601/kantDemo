import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../../baseComponents/button/Button'
import { View, StyleSheet } from 'react-native';
import LeaderBoardStyles from './LeaderBoardStyles'
import { create } from '../../helpers/PlatformSpecificStyles';
import Text from '../../baseComponents/text/Text';

class LeaderBoard extends Component {

    renderLeaderBoard = () => this.props.leaderBoardMatrix.map((userPair, i) =>
        (<View key={i}>
            {userPair.map(bot => {
                
                const userContainerStyle = [styles.botBox];

                bot.id ==100 && userContainerStyle.push(styles.userBox)
                return(
                <View style={userContainerStyle}>
                    <Text style={styles.nameBox}>{bot.name}</Text>
                </View>
            )}
            
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