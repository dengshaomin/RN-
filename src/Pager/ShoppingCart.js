/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default class ShoppingCart extends Component {

  static navigationOptions = {
    title: '购物车',
    tabBarIcon:({tintColor}) => (
      <View style={styles.iconView}>
        <Text style={[styles.icon,{color:tintColor}]}>&#xe60a;</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Shopping Cart</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconView:{
    alignSelf:'center',
    flex:1,
  },
  icon:{
    fontFamily:'iconfont',
    fontSize:20,
  }
});
