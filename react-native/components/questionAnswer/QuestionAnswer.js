import React, { Component } from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';
import Text from '../../baseComponents/text/Text';
import TextInput from '../../baseComponents/textInput/TextInput';
import QuestionAnswerStyles from './QuestionAnswerStyles';
import { create } from '../../helpers/PlatformSpecificStyles';
import ImageIndexing from "../../staticData/images";
import SoundQuestion from '../soundQuestion/SoundQuestion';
import ImageQuestion from '../imageQuestion/ImageQuestion';

class QuestionAnswer extends Component {

    handleUserInput = (userAnswer) => {
        this.props.onChangeValue({ userAnswer, key: this.props.quesIndex })
    }


    render() {
        let imageName = '';
        let soundName = '';
        if (this.props.qaFormat == 'IMGTXT') {
            imageName = this.props.questionParam.split(".jpeg")[0];
        }
        else if (this.props.qaFormat == 'MP3TXT') {
            soundName = this.props.questionParam.split(".mp3")[0];
            // console.log('soundName', soundName);
        }

        return (
            <View key={this.props.quesIndex}>
                <View style={styles.questionBoxContainer}>
                    {this.props.question &&
                        <Text style={styles.questionBoxText}>{this.props.question}</Text>
                    }
                    {!imageName && !soundName &&
                        <Text style={styles.questionBoxText}>{this.props.questionParam}</Text>}
                    {
                        !!imageName &&
                        <ImageQuestion
                            imageName={imageName} />
                    }
                    {
                        !!soundName &&
                        <SoundQuestion
                            soundName={soundName} />

                    }
                </View>

                <View style={styles.answerBoxContainer}>
                    {/* <Text style={styles.nameLabelText}>Please enter your answer</Text> */}
                    <TextInput value={this.props.userAnswer}
                        placeholder="Please write your answer"
                        onChangeText={this.handleUserInput}
                        hasErrors={this.props.isEmptyWarning}
                        keyboardType="email-address"
                    />
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