import PropTypes from 'prop-types';
import React from 'react';

import {
    Image,
    View
} from 'react-native';
import { createAppContainer, createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import StackViewStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator';

const kantAppStackNavigator = createStackNavigator( 
    {
        // AppInfoScreen: {
        //     screen: AppInfoScreen,
        //     navigationOptions: {
        //         header: null
        //     }
        // },

    });