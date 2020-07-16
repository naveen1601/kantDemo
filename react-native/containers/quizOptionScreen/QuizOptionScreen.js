import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Button from '../../baseComponents/button/Button';
import { create } from '../../helpers/PlatformSpecificStyles';
import QuizOptionScreenStyles from './QuizOptionScreenStyles'
import StudentInfoDisplay from '../../components/studentInfoDisplay/StudentInfoDisplay';
import { connect } from 'react-redux';

class QuizOptionScreen extends Component {
    state = {}
    render() {
        return (
            <View style={styles.quizScreen}>
                <StudentInfoDisplay name={this.props.name}
                    grade= {this.props.grade}
                    school= {this.props.school}/>
                <View style={styles.quizOptionButtonContainer}>
                    <Button
                        onPress={()=>{}}
                        text="Schedule Class"
                        secondaryButton={false}
                    />
                    <Button
                        onPress={()=>{}}
                        text="Virtual Class"
                        secondaryButton={false}
                    />
                    
                    <Button
                        onPress={()=>{}}
                        text="Practice Offline"
                        secondaryButton={false}
                    />
                </View>
                
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        name: state.login.userData && state.login.userData.name,
        grade: state.login.userData && state.login.userData.grade,
        school: state.login.userData && state.login.userData.school,
        isLoggedIn: state.login.isLoggedIn
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch1: () => {
            //dispatch(actionCreator)
        }
    }
}

let styles = create(QuizOptionScreenStyles);


export default connect(mapStateToProps, mapDispatchToProps)( QuizOptionScreen);