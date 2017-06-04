/* @flow */

import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image
} from 'react-native';

// 获取数据
import ManufacturerData from '../Store/ManufacturerData';


export default class Manufacturer extends PureComponent {

  static navigationOptions = {
    title:'品牌制造商',
    headerStyle:{
      elevation:0
    },
    headerTitleStyle:{
      alignSelf:'center',
      color:'black',fontSize:16,
      fontWeight:'200'
    },
    headerBackTitleStyle:{
      color:'black',fontSize:16,
      fontWeight:'200'
    }
  }

  constructor(props){
    super(props)
    this.state = {
      data:ManufacturerData
    }
     // this.data = new Array(100).fill({ManufacturerData})
  }

  // Flatlist滑动到底部触发消息事件
  _onEndReached = () => {
  this.setState({
    data:this.state.data.concat(ManufacturerData)
  });
};

  // 渲染Flatlist Item选项
  _renderItem = ({item}) =>{
    return (
        <Image resizeMode={Image.resizeMode.stretch} source={{uri:item.img}} style={{marginTop:5,height:200}}>
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text style={{color:'white',fontSize:17}}>{item.shopName + '|' + item.price}</Text>
          </View>
        </Image>

    )

  }

  // 返回FlatList Key
  _keyExtractor = (item, index) => 'Manufacturer' + index;

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          onEndReached={this._onEndReached}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
});
