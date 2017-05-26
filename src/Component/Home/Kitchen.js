/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';

const {width} = Dimensions.get('window')

export default class Kitchen extends Component {
  render() {
    return (
      <View style={[styles.container,this.props.styles]}>
        <Text>I'm the Kitchen component</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width
  },
});
