/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text as ReactText,
  StatusBar,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import LoginScreen from './containers/loginScreen/LoginScreen';
import Text from './baseComponents/text/Text';
import Button from './baseComponents/button/Button';
import FlatButton from './baseComponents/button/FlatButton'



const KantApp = () => {

  useEffect( () => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      <StatusBar 
        barStyle="dark-content"
        backgroundColor="transparent" />
      <SafeAreaView>
        <ScrollView>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <ReactText style={styles.sectionTitle}>Step One</ReactText>
              <ReactText style={styles.sectionDescription}>
                <ReactText style={styles.highlight}>ReactText Input</ReactText> 
              </ReactText>
              <LoginScreen/>
              <ReactText style={styles.sectionDescription}>
                <Text> Text box or Label </Text> 
              </ReactText>
              <Button
                onPress={()=>{}}
                text = "Primary Button"
              />
              <Button
                onPress={()=>{}}
                text = "Secondary Button"
                secondaryButton = {true}
              />
              <Button
                onPress={()=>{}}
                text = "Tertiary Button"
                tertiaryButton = {true}
              />
              <Button
                onPress={()=>{}}
                text = "Quaternary Button"
                quaternaryButton = {true}
              />
              <FlatButton 
                text = "Flat Button"
                onPress = {()=>{}}
              />

                  {/* containerStyle: ViewPropTypes.style,
    disabled: PropTypes.bool,
    onPress: PropTypes.func,
    quaternaryButton: PropTypes.bool,
    secondaryButton: PropTypes.bool,
    style: PropTypes.shape(),
    tertiaryButton: PropTypes.bool,
    testID: PropTypes.string,
    text: PropTypes.string,
    textStyle:PropTypes.shape() */}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  flatButton:{
    borderColor: 'black',
    borderWidth: 1,
    color: 'black'
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    paddingBottom: 10,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    paddingBottom: 4,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700'
    
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default KantApp;
