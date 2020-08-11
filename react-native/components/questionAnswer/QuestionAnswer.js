import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Text from '../../baseComponents/text/Text';
import TextInput from '../../baseComponents/textInput/TextInput';
import QuestionAnswerStyles from './QuestionAnswerStyles';
import { create } from '../../helpers/PlatformSpecificStyles';

class QuestionAnswer extends Component {

    handleUserInput = (userAnswer) => {
        this.props.onChangeValue({ userAnswer, key: this.props.quesIndex })
    }

    render() {
        return (
            <View key={this.props.quesIndex}>
                <View style={styles.questionBoxContainer}>
                    {this.props.question &&
                        <Text style={styles.questionBoxText}>{this.props.question}</Text>
                    }
                    <Text style={styles.questionBoxText}>{this.props.questionParam}</Text>

                </View>
                <View style={styles.answerBoxContainer}>
                    {/* <Text style={styles.nameLabelText}>Please enter your answer</Text> */}
                    <TextInput value={this.props.userAnswer}
                        placeholder="Please write your answer"
                        onChangeText={this.handleUserInput}
                        hasErrors={this.props.isEmptyWarning} />
                    {this.props.isEmptyWarning &&
                        <Text style={styles.validationErrorText}>Please enter your answer</Text>
                    }
                </View>
            </View>
        );
    }
}

QuestionAnswer.propTypes = {
    question: PropTypes.string.isRequired,
    userAnswer: PropTypes.string,
    onChangeValue: PropTypes.func,
    isEmptyWarning: PropTypes.bool,
    quesIndex: PropTypes.number.isRequired
};

let styles = create(QuestionAnswerStyles);

export default QuestionAnswer;