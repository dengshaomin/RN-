/* @flow */

import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  VirtualizedList
} from 'react-native';

// 控制类
import ShoppingCartControl from '../Tool/ShoppingCartControl';

// mobx
import {observer} from 'mobx-react';
import {observable,action,isObservableArray} from 'mobx';

// 购物车子组件
import ShopItem from '../Component/ShoppingCart/ShopItem';

@observer
export default class ShoppingCart extends PureComponent {

  @observable textData = new Array(10).fill({text:'a'})
  constructor(props){
    super(props)
    this.state = {
      inputState:false,
      editInputState:false
    }
    console.log(ShoppingCartControl.shopData);
  }

  static navigationOptions = {
    title: '购物车',
    header:null,
    tabBarIcon:({tintColor}) => (
      <View style={styles.iconView}>
        <Text style={[styles.icon,{color:tintColor}]}>&#xe60a;</Text>
        <Text style={styles.logoIcon}>{ShoppingCartControl.size}</Text>
      </View>
    )
  }

  // 渲染list数据
  _renderItem = ({item}) =>{
    console.log('item',item);
    console.log('keys',Object.keys(item.viewData));
    if (item.type == 'shopData') {
      var array = []
      for (var a in item.viewData){
        console.log(a);
        array.push(
          <ShopItem key={'ShopItem'+a} data={item.viewData[a]}/>
        )
      }
      return array
    }
  }

  // 返回FlatList Key
  _keyExtractor = (item, index) => 'ShoppingCart' + index;

  // 全选被按下
  @action
  _inputDown = () =>{
    if (!this.state.inputState) {
      ShoppingCartControl.selectQuantity = Object.keys(ShoppingCartControl.shopData[0].viewData).length
      ShoppingCartControl.selectedAmount = 0
      ShoppingCartControl.selectAll = true
      for (var a in ShoppingCartControl.shopData[0].viewData){
        let {number,price} = ShoppingCartControl.shopData[0].viewData[a]
        ShoppingCartControl.selectedAmount += number*price
      }
      this.setState({
        inputState:!this.state.inputState
      })
    }else {
      ShoppingCartControl.selectQuantity = 0
      ShoppingCartControl.selectedAmount = 0
      ShoppingCartControl.selectAll = false
      this.setState({
        inputState:!this.state.inputState
      })
    }
  }

  // 编辑全选被按下
  @action
  _editInputDown = () =>{
    if (!this.state.editInputState) {
      ShoppingCartControl.editSelected = Object.keys(ShoppingCartControl.shopData[0].viewData).length
      ShoppingCartControl.editSelectAll = true
      this.setState({
        editInputState:!this.state.editInputState
      })
    }else {
      ShoppingCartControl.editSelected = 0
      ShoppingCartControl.editSelectAll = false
      this.setState({
        editInputState:!this.state.editInputState
      })
    }
  }

  // 编辑 - 完成 按钮被按下
  @action
  _buttonDown = () =>{
    if (!ShoppingCartControl.editStatus) {
      ShoppingCartControl.editSelected = 0
      ShoppingCartControl.editSelectAll = false
      ShoppingCartControl.editStatus = !ShoppingCartControl.editStatus
      this.setState({
        editInputState:false
      })
    }else {
      ShoppingCartControl.editStatus = !ShoppingCartControl.editStatus
    }
  }

  // 删除按钮被按下
  @action
  _deleteButtonDown = () =>{
    if (ShoppingCartControl.editSelected >0) {
      ShoppingCartControl.size = Object.keys(ShoppingCartControl.shopData[0].viewData).length
      for (var a in ShoppingCartControl.shopData[0].viewData){
        console.log(a);
        if (ShoppingCartControl.shopData[0].viewData[a].editInputState) {

          if (ShoppingCartControl.shopData[0].viewData[a].inputState) {
            ShoppingCartControl.selectQuantity -=1
            ShoppingCartControl.selectedAmount -= ShoppingCartControl.shopData[0].viewData[a].number * ShoppingCartControl.shopData[0].viewData[a].price
          }
          ShoppingCartControl.editSelected -=1
          ShoppingCartControl.size -=1
          delete ShoppingCartControl.shopData[0].viewData[a]
        }
      }

      // ShoppingCartControl.shopData = v_shopData
      this.forceUpdate()
      console.log('ShoppingCartControl.shopData',ShoppingCartControl.shopData);
    }
  }

  _onViewableItemsChanged = (info) =>{
    console.log('list刷新',info);
    // return this._renderItem(info.changed[0])
    return false
  }



  render() {

    console.log('刷新数据');
    return (
      <View style={styles.container}>
        {/* 头部 */}
        <View style={styles.headerView}>
          <Text style={styles.headerTitle}>购物车</Text>
          {/* 编辑 */}
          {ShoppingCartControl.editStatus == false
            ?<Text style={styles.headerRight} onPress={this._buttonDown}>编辑</Text>
            :<Text style={styles.headerRight} onPress={this._buttonDown}>完成</Text>
          }
        </View>

        <View style={{marginTop:50,}}></View>
        {/* 购物菜单 */}
        <VirtualizedList
          // debug={true}
          ref={'_list'}
          // data={this.textData}
          data={ShoppingCartControl.shopData}
          keyExtractor={this._keyExtractor}
          onViewableItemsChanged={this._onViewableItemsChanged}
          ListFooterComponent={()=><View style={{height:60,backgroundColor:'white'}}></View>}
          renderItem={this._renderItem}
        />

        {/* 标题漂浮物 */}
        <View style={styles.titleFloaterView}>
          <Text style={{color:'rgb(243,131,0)'}}>登录后可同步电脑和手机购物车中的商品      ></Text>
        </View>

        {/* 订单漂浮物 */}
        <View style={styles.orderFloaterView}>
          {ShoppingCartControl.editStatus == false
            ?
            <View style={{flex:1,flexDirection:'row'}}>
              <View style={{justifyContent:'center',flexDirection:'row',width:'80%'}}>
                <View style={{width:50,height:'100%',justifyContent:'center',alignItems:'center'}}>
                  {this.state.inputState
                    ? <Text style={styles.inputShow} onPress={this._inputDown}>&#xe79a;</Text>
                    : <Text style={styles.inputHidden} onPress={this._inputDown}></Text>
                  }
                </View>
                <Text style={{width:150,textAlignVertical:'center',color:'rgb(147,147,147)'}}>{`已选(${ShoppingCartControl.selectQuantity})`}</Text>
                <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end'}}>
                  <Text style={{textAlignVertical:'center',color:'rgb(164,0,0)',width:100,textAlign:'center'}}>{`￥${ShoppingCartControl.selectedAmount}`}</Text>

                </View>

              </View>
              <TouchableOpacity style={{flex:1,backgroundColor:'rgb(164,0,0)'}}>
                <Text style={{color:'white',textAlignVertical:'center',height:'100%',textAlign:'center'}}>下单</Text>
              </TouchableOpacity>
            </View>
            :
            <View style={{flex:1,flexDirection:'row'}}>
              <View style={{flexDirection:'row',width:'80%'}}>
                <View style={{width:50,height:'100%',justifyContent:'center',alignItems:'center'}}>
                  {this.state.editInputState
                    ? <Text style={styles.inputShow} onPress={this._editInputDown}>&#xe79a;</Text>
                    : <Text style={styles.inputHidden} onPress={this._editInputDown}></Text>
                  }
                </View>
                <Text style={{width:150,textAlignVertical:'center',color:'rgb(147,147,147)'}}>{`已选(${ShoppingCartControl.editSelected})`}</Text>
              </View>
              <TouchableOpacity style={{flex:1,backgroundColor:ShoppingCartControl.editSelected?'rgb(164,0,0)':'rgb(147,147,147)'}} onPress={this._deleteButtonDown}>
                <Text style={{color:'white',textAlignVertical:'center',height:'100%',textAlign:'center'}}>删除所选</Text>
              </TouchableOpacity>
            </View>
          }

        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'rgb(244,244,244)'
  },
  iconView:{
    justifyContent:'center',
    flex:1,
  },
  icon:{
    fontFamily:'iconfont',
    fontSize:20,
  },
  logoIcon:{
    position:'absolute',
    right:0,top:0,width:17,height:12,
    borderRadius:5,backgroundColor:'red',
    fontSize:10,color:'white',
    textAlign:'center',justifyContent:'flex-start',textAlignVertical:'top'
  },
  headerView:{
    height:50,
    backgroundColor:'white',
    justifyContent:'center',alignItems:'center',
    flexDirection:'row'
  },
  headerTitle:{
    fontSize:17,
    color:'black',
  },
  headerRight:{
    position:'absolute',
    right:10,
    width:30,
    height:20,
  },
  titleFloaterView:{
    position:'absolute',
    top:50,height:50,width:'100%',
    justifyContent:'center',alignItems:'center',
    backgroundColor:'rgb(255,247,210)'
  },
  orderFloaterView:{
    borderTopColor:'rgb(147,147,147)',
    borderTopWidth:0.5,
    position:'absolute',
    bottom:0,width:'100%',height:60,
    backgroundColor:'white',
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
