import React, { Component } from 'react';
import FlatButton from '../../baseComponents/button/FlatButton';
import Sound from 'react-native-sound';
import SoundIndexing from "../../staticData/mp3";

class SoundQuestion extends Component {

    state = {
        isPlayClicked: false
    };
    isPlaying = false;

    playSound = (soundName) => {
        this.setState({
            isPlayClicked: true
        });
        this.soundQuestion = new Sound(SoundIndexing[soundName], (error, sound) => {
            if (error) {
                alert('error' + error.message);
                return;
            }
            // alert('Play');

            !this.isPlaying &&
                this.soundQuestion.play(() => {
                    // alert('Finished');
                    this.setState({
                        isPlayClicked: false
                    });
                    this.isPlaying = false;
                    this.soundQuestion.release();
                });
            this.isPlaying = true;
        });
    }

    render() {
        const soundButtonText = this.state.isPlayClicked ? 'Playing...' : 'Play Sound'
        return (
            <FlatButton
                onPress={() => this.playSound(this.props.soundName)}
                text={soundButtonText} />

        );
    }

}

export default SoundQuestion;