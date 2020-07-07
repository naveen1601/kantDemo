import PropTypes from 'prop-types';
import React from 'react';
import {
    Text as ReactText,
    Platform
} from 'react-native';
import { create } from '../../helpers/PlatformSpecificStyles';
import TextStyles from './TextStyles';
import Config from '../../Configs';

const Text = (props) => {

    let textStyles = [styles.text, props.style];
    if (props.hasErrors) {
        textStyles.push(styles.textError);
    }
    if (props.fontWeight === 'regular') {
        textStyles.push(styles.textRegular);
    } else if (props.fontWeight === 'bold') {
        textStyles.push(styles.textBold);
    }

    let textProps = {
        style: textStyles,
        testID: props.testID,
        accessible: true,
        numberOfLines: props.numberOfLines,
        onPress: props.onPress,
        allowFontScaling: Config.ALLOW_FONT_SCALING
    };

    if (Platform.OS === 'android')
        textProps.accessibilityLabel = props.testID;

    return (
        <ReactText {...textProps}>
            {props.children}
        </ReactText>

    );
};

let styles = create(TextStyles);

const WEIGHTS = ['regular', 'bold'];

Text.propTypes =  {
    children: PropTypes.node,
    fontWeight: PropTypes.oneOf(WEIGHTS),
    hasErrors: PropTypes.bool,
    numberOfLines: PropTypes.number,
    onPress: PropTypes.func,
    style: ReactText.propTypes.style,
    testID: PropTypes.string
};

export default Text;
