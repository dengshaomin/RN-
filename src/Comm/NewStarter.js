/* @flow */

import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';

// 工具类api
import scrollControl from '../Tool/scrollControl';


export default class NewStarter extends PureComponent {

  // 菜单被点击
  _ImgDown = () =>{
    global.navigation.navigate('CommodityInformation')
  }
  
  // 渲染滚动条数据
  _renderScrollView = () =>{
    const {height} = this.props
    mHeight = height - 80
    return this.props.data.map((el,i)=>{
      return (
        <TouchableOpacity key={'NewStarter'+i} style={[styles.scrollItemView,{height:mHeight}]} onPress={this._ImgDown}>
          <Image source={{uri:el.img}} style={{width:120,height:120}}></Image>
          <Text style={{color:'black'}}>{el.shopName}</Text>
          <Text style={{marginTop:5,color:'rgb(164,0,0)'}}>{el.price}</Text>
        </TouchableOpacity>
      )
    })
  }

  // 触摸开始
  _onTouchStart = (e) =>{
    console.log('onTouchStart',e.nativeEvent);
    scrollControl.screenEnable = false
  }

  // 一帧结束后调用
  _onMomentumScrollEnd = () =>{
    scrollControl.screenEnable = true
  }

  render() {
    const {height} = this.props
    return (
      <View style={[styles.container,{height}]}>
        {/* 标题部分 */}
        <View style={styles.titleView}>
          <Text style={{color:'black',fontSize:16}}>周一周四 . 新品首发</Text>
          <Text style={{marginTop:5,color:'black',fontSize:14}}>查看全部></Text>
        </View>

        {/* 滚动条部分 */}
        <ScrollView
          style={{backgroundColor:'white'}}
          removeClippedSubviews={true}
          onTouchStart={this._onTouchStart}
          onMomentumScrollEnd={this._onMomentumScrollEnd}
          horizontal={true} showsHorizontalScrollIndicator={false}>
          {this._renderScrollView()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height:250,
    marginTop:10,
    backgroundColor:'rgb(242,242,242)'
  },
  titleView:{
    height:80,
    marginTop:10,
    backgroundColor:'rgb(240,232,214)',
    justifyContent:'center',alignItems:'center'
  },
  scrollItemView:{
    width:230,
    justifyContent:'center',alignItems:'center'
  }
});
