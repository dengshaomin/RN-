/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const TabBar = (
  tabBarComponent,
  tabBarOptions
) => {

  console.log('tabBarComponent',tabBarComponent);
  console.log('tabBarOptions',tabBarOptions);

  class TabNavigator extends Component {
    render(){
      console.log('tabBarComponent',tabBarComponent);
      console.log('tabBarOptions',tabBarOptions);
      console.log('props',this.props);
      return (
        <Text>asda</Text>
      )
    }
  }

  return TabNavigator
}

export default TabBar
