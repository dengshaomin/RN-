/* @flow */

/* @flow */

import React from 'react';
import {
  AppRegistry,
  AppState
} from 'react-native';



import SplashScreen from 'react-native-splash-screen'
import {StackNavigator} from 'react-navigation';
import TabBar from './Comm/TabBar';


const TabNavigator = TabBar({
  'Home':{screen:'test'}},
  {
    'Test':'a'
  }
)

AppState.addEventListener('change', (nextAppState)=>{
  if (nextAppState === 'active'){
    if (global.init === true){
      SplashScreen.hide();
    }}
});

const StackApp = StackNavigator({
    Home:{screen:TabNavigator}
  },
  {
    initialRoute:'Home',
    headerMode:'none'
  }
  )





AppRegistry.registerComponent('WY_YX', () => StackApp);
