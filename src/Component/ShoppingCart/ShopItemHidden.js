/* @flow */

import React, { PureComponent ,Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  TouchableHighlight,
  Animated
} from 'react-native';


//组件列表
import ShopWeight from './ShopWeight';
import ShopValuation from './ShopValuation';

// 控制接口
import ShoppingCartControl from '../../Tool/ShoppingCartControl';

// mobx
import {action,intercept} from 'mobx';


export default class ShopItemHidden extends Component {

  constructor(props){
    super(props)
    let {data} = this.props
    this.state = {
      display:'flex'
    }

    intercept(ShoppingCartControl,'editSelectAll',change =>{
      if (typeof ShoppingCartControl.shopData[0].viewData[data.shopID] !='undefined') {
        if (change.newValue) {
            ShoppingCartControl.shopData[0].viewData[data.shopID].editInputState = true
        }else {
            ShoppingCartControl.shopData[0].viewData[data.shopID].editInputState = false
        }
        this.forceUpdate()
      }
      return change
    })

    // intercept(ShoppingCartControl,'deleteButton',change =>{
    //   if (change.newValue && ShoppingCartControl.shopData[0].viewData[data.shopID].editInputState) {
    //     var v_shopData = Object.assign({},ShoppingCartControl.shopData[0])
    //     console.log(v_shopData);
    //     delete v_shopData.viewData[data.shopID]
    //     console.log(v_shopData);
    //     var shopData = v_shopData
    //     console.log(shopData);
    //     // ShoppingCartControl.shopData =
    //   }
    //   return change
    // })

  }

  // 选择按钮-显示
  @action
  _inputShow = () =>{
    let {data} = this.props
    ShoppingCartControl.editSelected +=1
    ShoppingCartControl.shopData[0].viewData[data.shopID].editInputState = true
    this.forceUpdate()
  }

  // 选择按钮-隐藏
  @action
  _intputHidden = () =>{
    let {data} = this.props
    ShoppingCartControl.editSelected -=1 //选择数量减少1
    ShoppingCartControl.shopData[0].viewData[data.shopID].editInputState = false
    this.forceUpdate()
  }

  // 选择按钮被按下
  @action
  _inputDown = () =>{
    let {data} = this.props

    if (!ShoppingCartControl.shopData[0].viewData[data.shopID].editInputState) {
      this._inputShow()
    }else {
      this._intputHidden()
    }
  }


  render() {
    console.log('hidden更新',this.state.height);
    const {data} = this.props
    // {opacity:this.state.scale}
    return (
      <Animated.View style={[styles.container,{display:this.state.display}]}>

        <View style={{height:100,width:'100%',flexDirection:'row'}}>
          {/* 左侧选择按钮 */}
          <View style={{width:50,height:'100%',justifyContent:'center',alignItems:'center'}}>
            {ShoppingCartControl.shopData[0].viewData[data.shopID].editInputState
              ? <Text style={styles.inputShow} onPress={this._inputDown}>&#xe79a;</Text>
              : <Text style={styles.inputHidden} onPress={this._inputDown}></Text>
            }
          </View>

          {/* 菜单图片 */}
          <View style={{width:80,height:'100%',justifyContent:'center',backgroundColor:'rgb(244,244,244)'}}>
            <Image source={{uri:data.img}} style={{width:80,height:80}}/>
          </View>

          {/* 价格 */}
          <View style={{marginLeft:10,flex:1}}>
            {/* 计价按钮 - 菜品重量 */}
            <View style={{marginTop:10,alignItems:'flex-end'}}>
              <ShopWeight data={data}/>
            </View>

            {/* 价格 - 选择按钮 */}
            <View style={{flex:1,alignItems:'flex-end',flexDirection:'row'}}>
              <Text style={{color:'black'}}>{`￥${data.price}`}</Text>

              <View style={{flex:1,justifyContent:'center',alignItems:'flex-end',marginRight:2}}>
                <ShopValuation data={data} />
              </View>
            </View>

          </View>


        </View>
      </Animated.View>
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
