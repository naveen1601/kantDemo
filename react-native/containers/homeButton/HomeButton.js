import React from 'react';
import { connect } from 'react-redux';
import FlatButton from '../../baseComponents/button/FlatButton';
import { resetScreen, Screens } from '../../helpers/ScreenHelpers';

const HomeButton = (props) => {
    let screenName = props.isLoggedIn ? Screens.QuizOptionScreen : Screens.LoginOption;
    return (
        <FlatButton
            onPress={() => resetScreen(props.navigation,screenName)}
            text='Home'
        />
    );
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.login?.isLoggedIn, 
    }
}

export default connect(mapStateToProps)(HomeButton);