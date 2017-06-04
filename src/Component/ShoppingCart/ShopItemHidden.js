/* @flow */

import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  TouchableHighlight
} from 'react-native';


//组件列表
import ShopWeight from './ShopWeight';
import ShopValuation from './ShopValuation';

export default class ShopItemHidden extends PureComponent {

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

          {/* 价格 */}
          <View style={{marginLeft:10,flex:1}}>
            {/* 计价按钮 - 菜品重量 */}
            <View style={{marginTop:10,alignItems:'flex-end'}}>
              <ShopWeight data={data}/>
            </View>

            {/* 价格 - 选择按钮 */}
            <View style={{flex:1,alignItems:'flex-end',flexDirection:'row'}}>
              <Text style={{color:'black'}}>{`￥${data.price}`}</Text>

              <View style={{flex:1,justifyContent:'flex-end',alignItems:'flex-end'}}>
                <ShopValuation data={data} />
              </View>
            </View>

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
