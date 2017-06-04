/* @flow */

import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';

export default class ShopItemShow extends PureComponent {

    constructor(props){
      super(props)
      this.state = {
        inputState:false
      }
    }

    // 选择按钮被按下
    _inputDown = () =>{
      this.setState({
        inputState:!this.state.inputState
      })
    }

    render() {
      const {data} = this.props
      return (
        <View style={styles.container}>
          <View style={{height:100,width:'100%',flexDirection:'row'}}>
            {/* 左侧选择按钮 */}
            <View style={{width:50,height:'100%',justifyContent:'center',alignItems:'center'}}>
              {this.state.inputState
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
