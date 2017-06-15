/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default class CacheView extends Component {

  constructor(props){
    super(props)
    this.state = {
      inital:false
    }
    setTimeout(()=>{
      this.setState({
        inital:true
      })
    },1000)
  }

  render() {
    const {component as Comp } = this.props
    
    return (
      <View style={styles.container}>
        {this.state.inital
          ?<Comp/>
          :null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
