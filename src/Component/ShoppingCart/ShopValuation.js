/* @flow */

import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput
} from 'react-native';

// 控制接口
import ShoppingCartControl from '../../Tool/ShoppingCartControl';

// mobx
import {action} from 'mobx';

export default class ShopValuation extends PureComponent {

  constructor(props){
    super(props)
    let {data} = this.props
    this.state = {
      modalVisible:false,
      modalPrice:ShoppingCartControl.shopData[0].viewData[data.shopID].number
    }
  }

  // 减少被按下
  _reduceDown = () =>{
    let {data} = this.props

    if (ShoppingCartControl.shopData[0].viewData[data.shopID].number -1 >= 1) {
      ShoppingCartControl.shopData[0].viewData[data.shopID].number -=1
      if (ShoppingCartControl.shopData[0].viewData[data.shopID].inputState) {
        ShoppingCartControl.selectedAmount -= ShoppingCartControl.shopData[0].viewData[data.shopID].price
      }
      this.forceUpdate()
    }
  }

  // 增加被按下
  _increaseDown = () =>{
     let {data} = this.props
     ShoppingCartControl.shopData[0].viewData[data.shopID].number +=1
     if (ShoppingCartControl.shopData[0].viewData[data.shopID].inputState) {
       ShoppingCartControl.selectedAmount += ShoppingCartControl.shopData[0].viewData[data.shopID].price
     }
     this.forceUpdate()
  }

  // modal减少被按下
  _modalReduceDown = () =>{
    this.state.modalPrice -1 >=1 && this.setState({modalPrice:this.state.modalPrice-1})
  }

  // modal增加被按下
  _modalIncreaseDown = () =>{
    console.log('modal增加被按下');
    this.setState({modalPrice:this.state.modalPrice+1})
  }

  // 确定按钮被按下
  @action
  _successButtonDown = () =>{
    let {data} = this.props
    if (this.state.modalPrice > ShoppingCartControl.shopData[0].viewData[data.shopID].number) {
      if (ShoppingCartControl.shopData[0].viewData[data.shopID].inputState) {
        var number = this.state.modalPrice - ShoppingCartControl.shopData[0].viewData[data.shopID].number
        ShoppingCartControl.selectedAmount += number * ShoppingCartControl.shopData[0].viewData[data.shopID].price
      }
    }else {
      if (ShoppingCartControl.shopData[0].viewData[data.shopID].inputState) {
        var number = this.state.modalPrice - ShoppingCartControl.shopData[0].viewData[data.shopID].number
        ShoppingCartControl.selectedAmount += number * ShoppingCartControl.shopData[0].viewData[data.shopID].price
      }
    }
    ShoppingCartControl.shopData[0].viewData[data.shopID].number = this.state.modalPrice
    this.setState({modalVisible:false})
  }

  // 文本框被按下
  _intputDown = () =>{
    let {data} = this.props
    this.setState({
        modalVisible:true,
        modalPrice:ShoppingCartControl.shopData[0].viewData[data.shopID].number
      })
  }

  render() {
    let {data} = this.props
    let mNumber = ShoppingCartControl.shopData[0].viewData[data.shopID].number
    console.log('更新');
    return (
      <View>
        <Modal
          transparent={true}
          visible={this.state.modalVisible}
          >
            <View style={{flex:1,backgroundColor:'rgba(0,0,0,0.7)',alignItems:'center'}}>
              <View style={{width:200,height:100,backgroundColor:'white',marginTop:20}}>
                {/* 数量选择 */}
                <View style={{height:'60%',flexDirection:'row',justifyContent:'center',marginTop:10}}>
                  <Text style={styles.textView} onPress={this._modalReduceDown}>-</Text>
                  <TextInput underlineColorAndroid={'transparent'} keyboardType={'numeric'} defaultValue={`${this.state.modalPrice}`} onChangeText={(text)=>this.setState({modalPrice:text})} style={[styles.textView,{fontSize:15}]} value={`${this.state.modalPrice}`}></TextInput>
                  <Text style={styles.textView} onPress={this._modalIncreaseDown}>+</Text>
                </View>

                {/* 确认 - 取消 */}
                <View style={{flex:1,flexDirection:'row',borderTopColor:'rgb(147,147,147)',borderTopWidth:0.5}}>
                  <Text style={{flex:1,textAlign:'center',textAlignVertical:'center',color:"black"}} onPress={()=>{this.setState({modalVisible:false})}} >取消</Text>
                  <Text style={{flex:1,textAlign:'center',textAlignVertical:'center',color:'rgb(164,0,0)'}} onPress={this._successButtonDown}>确认</Text>
                </View>
              </View>
            </View>
        </Modal>

        <View style={styles.container}>
          <Text style={styles.textView} onPress={this._reduceDown}>-</Text>
          <Text style={styles.textView} onPress={this._intputDown}>{mNumber}</Text>
          <Text style={styles.textView} onPress={this._increaseDown}>+</Text>
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
  },
  textView:{
    borderColor:'rgb(147,147,147)',
    borderWidth:1,
    width:40,height:40,
    textAlign:'center',
    textAlignVertical:'center'
  }
});
