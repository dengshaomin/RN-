/* @flow */

import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

// mobx
import {observer} from 'mobx-react';

// 组件视图
import ShopItemShow from './ShopItemShow';
import ShopItemHidden from './ShopItemHidden';

// 控制接口
import ShoppingCartControl from '../../Tool/ShoppingCartControl';

@observer
export default class ShopItem extends PureComponent {

  render() {
    const {data} = this.props
    return (
      <View style={styles.container}>
        {ShoppingCartControl.editStatus
          ? <ShopItemHidden data={data} />
          : <ShopItemShow data={data} />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height:150,
    marginTop:10,
    backgroundColor:'rgb(244,244,244)'
  },
});
