import PropTypes from 'prop-types';
import React from 'react';
import {
    View
} from 'react-native';
import Text from '../../baseComponents/text/Text';
import AlertStyles,{ PropStyles } from './AlertStyles';
import { create } from '../../helpers/PlatformSpecificStyles';

const Alert =(props)=>{
    const { message, type, testID } = props;
    let color;
    const messageStyles = [styles.message];
    const alertWrapperStyles = [styles.alertWrapper];
    if (type === 'error') {
        color = PropStyles.errorColor;
        messageStyles.push(styles.errorMessage);
    }
    else if (type === 'warning') {
        color = PropStyles.warningColor;
        messageStyles.push(styles.warningMessage);
    }
    else if (type === 'alertInfo') {
        messageStyles.push(styles.infoMessage);
        alertWrapperStyles.push(styles.alertInfoWrapper);
    }
    else if (type === 'alertSuccess') {
        messageStyles.push(styles.infoMessage);
        alertWrapperStyles.push(styles.alertSuccessWrapper);
    }
    else if (type === 'alertWarningAction') {
        color= PropStyles.chevronColor;
        messageStyles.push(styles.infoMessage);
        alertWrapperStyles.push(styles.alertWarningActionWrapper);
    }

    return (
        <View style={alertWrapperStyles}
            testID={testID}
            accessibilityLabel={testID}>
            {
                (type === 'alertWarningAction' ) &&
                    <View style={styles.alertWarningAction}>
                        <Text testID="errorMessageText"
                            style={messageStyles}>
                            {message}
                        </Text>

                    </View>
            }
            {
                (type !== 'alertWarningAction' ) &&
                    <Text testID="errorMessageText"
                        style={messageStyles}>
                        {message}
                    </Text>

            }
        </View>
    );
};

Alert.propTypes = {
    message: PropTypes.string,
    testID: PropTypes.string,
    type: PropTypes.oneOf(['error', 'warning', 'alertInfo', 'alertSuccess', 'alertWarningAction']).isRequired
};

export default Alert;
const styles = create(AlertStyles);