import React, { Component } from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';
import Text from '../../baseComponents/text/Text';
import TextInput from '../../baseComponents/textInput/TextInput';
import QuestionAnswerStyles from './QuestionAnswerStyles';
import { create } from '../../helpers/PlatformSpecificStyles';
import ImageIndexing from "../../staticData/images";
import Button from '../../baseComponents/button/Button';

class QuestionAnswer extends Component {

    handleUserInput = (userAnswer) => {
        this.props.onChangeValue({ userAnswer, key: this.props.quesIndex })
    }

    renderSoundQuestion = (soundLocation) => {
        // Sound.setCategory('Playback');

        return (
            <Button
                onPress={()=>{}}
                text={'Play'}
            />
        );
    }

    render() {
        let imageName = '';
        let soundLocation = '';
        if (this.props.qaFormat == 'IMGTXT') {
            imageName = this.props.questionParam.split(".jpeg")[0];
        }
        else if (this.props.qaFormat == 'MP3TXT') {
            console.log('soundLocation', soundLocation);
        }
        return (
            <View key={this.props.quesIndex}>
                <View style={styles.questionBoxContainer}>
                    {this.props.question &&
                        <Text style={styles.questionBoxText}>{this.props.question}</Text>
                    }
                    {!imageName && !soundLocation &&
                        <Text style={styles.questionBoxText}>{this.props.questionParam}</Text>}
                    {
                        !!imageName &&
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <Image source={ImageIndexing[imageName]}
                                style={styles.imageBox}
                                resizeMode="contain" />
                        </View>
                    }
                    {/* {
                        !!soundLocation &&
                        this.renderSoundQuestion(soundLocation)
                    } */}
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