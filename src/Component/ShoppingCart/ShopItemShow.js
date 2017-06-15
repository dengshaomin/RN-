/* @flow */

import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';

// 控制接口
import ShoppingCartControl from '../../Tool/ShoppingCartControl';

// mobx
import {action,intercept} from 'mobx';

export default class ShopItemShow extends PureComponent {

    constructor(props){
      super(props)
      let {data} = this.props

      intercept(ShoppingCartControl,'selectAll',change =>{
        console.log('hasOwnProperty',data.shopID,ShoppingCartControl.shopData[0].viewData.hasOwnProperty(data.shopID));
        if (ShoppingCartControl.shopData[0].viewData.hasOwnProperty(data.shopID)) {
          if (change.newValue) {
              ShoppingCartControl.shopData[0].viewData[data.shopID].inputState = true
          }else {
              ShoppingCartControl.shopData[0].viewData[data.shopID].inputState = false
          }
          this.forceUpdate()
        }

        return change
      })
    }

    // 添加
    @action
    _add = () =>{
      console.log('添加');
      let {data} = this.props
      ShoppingCartControl.selectQuantity += 1
      ShoppingCartControl.selectedAmount += data.number * data.price
      ShoppingCartControl.shopData[0].viewData[data.shopID].inputState = true
      this.forceUpdate()
    }

    // 减少
    @action
    _reduce = () =>{
      let {data} = this.props
      ShoppingCartControl.selectQuantity -= 1
      ShoppingCartControl.selectedAmount -= data.number * data.price
      ShoppingCartControl.shopData[0].viewData[data.shopID].inputState = false
      this.forceUpdate()
    }

    // 选择按钮被按下
    @action
    _inputDown = () =>{
      let {data} = this.props
      if (!ShoppingCartControl.shopData[0].viewData[data.shopID].inputState) {
        this._add()
      }else {
        this._reduce()
      }
    }

    render() {
      let {data} = this.props
      console.log('更新');
      return (
        <View style={styles.container}>
          <View style={{height:100,width:'100%',flexDirection:'row'}}>
            {/* 左侧选择按钮 */}
            <View style={{width:50,height:'100%',justifyContent:'center',alignItems:'center'}}>
              {ShoppingCartControl.shopData[0].viewData[data.shopID].inputState
                ? <Text style={styles.inputShow} onPress={this._inputDown}>&#xe79a;</Text>
                : <Text style={styles.inputHidden} onPress={this._inputDown}></Text>
              }
            </View>

            {/* 菜单图片 */}
            <View style={{width:80,height:'100%',justifyContent:'center',backgroundColor:'rgb(244,244,244)'}}>
              <Image source={{uri:data.img}} style={{width:80,height:80}}/>
            </View>

            {/* 菜单名字 - 菜单价格 */}
            <View style={{marginLeft:10,justifyContent:'flex-start'}}>
              <Text style={{color:'black'}}>{data.shopName}</Text>
              <Text>{`${data.shopWeight}克`}</Text>
              <View style={{flex:1,alignItems:'flex-start',justifyContent:'flex-end'}}>
                <Text style={{color:'black'}}>{`￥${data.price}`}</Text>
              </View>
            </View>


            {/* 购买数量 */}
            <View style={{flex:1,justifyContent:'flex-start',alignItems:'flex-end'}}>
              <Text style={{color:'black'}}>{`x${data.number}`}</Text>
            </View>
          </View>
        </View>
      );
    }

}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    backgroundColor:'white'
  },
  inputHidden:{
    width:20,height:20,
    borderRadius:10,
    borderColor:'rgb(147,147,147)',
    borderWidth:0.5
  },
  inputShow:{
    fontFamily:'iconfont',
    fontSize:20,
    color:'rgb(164,0,0)'
  }
});
