/* @flow */

import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  Alert,
  Image
} from 'react-native';

export default class ShopWeight extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
      modalVisible:false
    }
  }

  // 文本被按下
  _textDown = () =>{
    this.setState({
      modalVisible:!this.state.modalVisible
    })
  }

  // 确认按钮被按下
  _buttonDown = () =>{
    alert('确认按钮被按下')
  }

  render() {
    const {data} = this.props

    return (
      <View style={styles.container}>
        {/* 弹出层视图 */}
        <Modal
          transparent={true}
          visible={this.state.modalVisible}
          >
         <View style={{flex:1,backgroundColor:'rgba(0,0,0,0.7)'}}>
           {/* 底部菜单选择 */}
           <View style={{position:'absolute',bottom:0,left:0,right:0,height:350,backgroundColor:'white'}}>
             <ScrollView
               showsVerticalScrollIndicator={false}
               removeClippedSubviews={true}
               >
                <View style={{marginLeft:10,marginTop:10}}>
                   {/* 菜单图片  */}
                   <View style={{height:120,flexDirection:'row'}}>
                     <View style={{width:120,height:120,backgroundColor:'rgb(244,244,244)',}}>
                      <Image source={{uri:data.img}} style={{width:'100%',height:'100%'}}/>
                     </View>

                     {/* 价格 - 规格  */}
                     <View style={{flex:1,marginLeft:6,justifyContent:'flex-end',alignItems:'flex-start'}}>
                       <Text style={{color:'rgb(164,0,0)'}}>{`价格:￥${data.price}`}</Text>
                       <Text>{`已选择:${data.shopWeight}克`}</Text>
                     </View>
                   </View>

                   {/* 规格 */}
                   <View style={{marginTop:10,width:60}}>
                     <Text style={{color:'black',fontSize:19}}>规格</Text>
                     <Text style={{marginTop:10,borderColor:'rgb(164,0,0)',borderWidth:1,color:'rgb(164,0,0)',textAlign:'center'}}>{`${data.shopWeight}克`}</Text>
                   </View>

                   {/* 数量 */}
                   <View>
                     
                   </View>
                </View>
             </ScrollView>

            {/* 关闭按钮 */}
            <View style={{position:'absolute',top:20,right:20}}>
              <Text onPress={this._textDown} style={{fontSize:18}}>X</Text>
            </View>

            {/* 确定按钮  */}
            <View style={{position:'absolute',bottom:0,width:'100%',height:50,justifyContent:'center',alignItems:'center',backgroundColor:'rgb(164,0,0)'}}>
              <Text style={{color:'white'}} onPress={this._buttonDown}>确定</Text>
            </View>

           </View>
         </View>
        </Modal>

        {/* 普通视图 */}
          <Text onPress={this._textDown}>{`已选择:${data.shopWeight}克`}
            <Text style={{fontFamily:'iconfont',fontSize:15}}>&#xe68b;</Text>
          </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginRight:10
  },
});
