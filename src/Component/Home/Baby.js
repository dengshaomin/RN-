/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';

const {width} = Dimensions.get('window')

export default class Baby extends Component {
  render() {
    return (
      <View style={[styles.container,this.props.style]}>
        <Text>I'm the Baby component</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width
  },
});
