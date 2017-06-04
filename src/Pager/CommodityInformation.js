/* @flow */

import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default class CommodityInformation extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Text>I'm the CommodityInformation component</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
