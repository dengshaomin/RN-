/* @flow */

/* @flow */

import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  AppRegistry,
  AppState
} from 'react-native';



import SplashScreen from 'react-native-splash-screen'
import {StackNavigator} from 'react-navigation';

AppState.addEventListener('change', (nextAppState)=>{
  if (nextAppState === 'active'){
    if (global.init === true){
      SplashScreen.hide();
    }}
});

export default SimpleApp = StackNavigator({
)


AppRegistry.registerComponent('WY_YX', () => SimpleApp);
