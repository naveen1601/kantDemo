import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import QuizInfoStyles from './QuizInfoStyles'
import { create } from '../../helpers/PlatformSpecificStyles';
import Text from '../../baseComponents/text/Text';
import moment from 'moment';

class QuizInfo extends Component {
    state = {
        isQuizListSelected: false
    }

    renderQuizInfo = () => {
        if (this.props.quizDetail)
            return (
                <View style={styles.quizInfoContainer}>
                    <View style={styles.dateDesc}>
                        <Text style={styles.dateText}>{moment(this.props.quizDetail.startDate).format('DD MMM YYYY, ddd')}</Text>
                    </View>
                    <View style={styles.timeDesc}>
                        <Text style={styles.timeText}>{moment(this.props.quizDetail.startDate).format('HH:mm')} - {moment(this.props.quizDetail.endDate).format('HH:mm')} </Text>
                    </View>
                </View>
            )
    }

    // handlePress = () => {        
    //     this.props.onPress(this.props.quizDetail.quizId);
    // }

    render() {
        return (
            // <TouchableOpacity onPress={this.handlePress}>
                this.renderQuizInfo()
            // </TouchableOpacity>
        );
    }
}

QuizInfo.propTypes = {
    quizDetail: PropTypes.array
};

let styles = create(QuizInfoStyles);

export default QuizInfo;