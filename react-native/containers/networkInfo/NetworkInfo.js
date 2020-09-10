import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
    View
} from 'react-native';
import Text from '../../baseComponents/text/Text';
import { create } from '../../helpers/PlatformSpecificStyles';
import NetworkInfoStyles from './NetworkInfoStyles';

class NetworkInfo extends Component {

    render() {
        let isConnected = this.props.isConnected;
        return (
            <View style={styles.offlineContainer}>
                {!isConnected &&
                    <View style={styles.offline}>
                        <Text style={styles.offlineText}
                            testID="offlineText">You are currently offline</Text>
                    </View>
                }
            </View>
        );
    }
}

NetworkInfo.propTypes =  {
    isConnected: PropTypes.bool,
};

let styles = create(NetworkInfoStyles);
export default NetworkInfo;
