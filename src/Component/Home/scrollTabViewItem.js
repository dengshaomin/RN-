/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import {observer} from 'mobx-react/native';

export default class ScrollTabViewItem extends Component {


  // 渲染ScrollTabViewItem
  _renderScollTabView = () =>{
    return this.props.data.map((el,index)=>{
      return (
        <View style={styles.scollItemView}>
          <Text onPress={this.props.onPress.bind(this,index)} style={this.props.index === index ? styles.show:styles.hide}>{el}</Text>
        </View>
      )
    })
  }

  render() {
    return (
      <View style={styles.container}>
        {this._renderScollTabView()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row'
  },
  scollItemView:{
    width:70,
    justifyContent:'center',
    alignItems:'center'
  },
  show:{
    color:'rgb(164,0,0)'
  },
  hide:{
    color:'rgb(106,106,106)'
  }
});
