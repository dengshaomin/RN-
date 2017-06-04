/* @flow */

import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default class Personal extends PureComponent {

  static navigationOptions = {
    title: '个人',
    header:null,
    tabBarIcon:({tintColor}) => (
      <View style={styles.iconView}>
        <Text style={[styles.icon,{color:tintColor}]}>&#xe843;</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Personal</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconView:{
    // alignSelf:'flex-end',
    justifyContent:'center',
    flex:1,
  },
  icon:{
    fontFamily:'iconfont',
    fontSize:25,
  }
});
