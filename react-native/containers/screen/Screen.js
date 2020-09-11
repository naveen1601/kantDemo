import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { connect } from 'react-redux';
import ScreenStyles from './ScreenStyles';
import NetworkInfo from '../networkInfo/NetworkInfo';
import NetworkInfoActions from '../networkInfo/NetworkInfoActions';
import { create } from '../../helpers/PlatformSpecificStyles';

class Screen extends Component {

    constructor(props) {
        super(props);
        this.handleConnectivityChange = this.handleConnectivityChange.bind(this);
        this.unsubscribe = ()=>{}
    }

    componentDidMount() {
        //Android, dont get connection info in listener as soon as app opens. So fetching and then adding listener
        this.unsubscribe = NetInfo.addEventListener(state => {
            // console.log("Connection type", state.type);
            // console.log("Is connected?", state.isConnected);
            this.handleConnectivityChange(state.isConnected);
          });
    }

    componentWillUnmount() {
       this.unsubscribe();
    }

    handleConnectivityChange(isConnected) {
        this.props.handleConnectivityChange(isConnected);
    }

    render() {
        return (
            <View style={styles.screen}>
                <NetworkInfo isConnected={this.props.isConnected}/>
                {this.props.children}
            </View>
        );
    }
}

Screen.propTypes =  {
    children: PropTypes.node,
    handleConnectivityChange: PropTypes.func,
    isConnected: PropTypes.bool,
};

function mapStateToProps(state) {
    return {
        isConnected: state.networkinfo.isConnected,
    };
}

let mapDispatchToProps = function (dispatch) {
    return {
        handleConnectivityChange: function (isConnected) {
            dispatch(NetworkInfoActions.handleConnectivityChange(isConnected));
        }
    };
};

let styles = create(ScreenStyles);

export default connect(mapStateToProps, mapDispatchToProps)(Screen);
export let ScreenForTest = Screen;