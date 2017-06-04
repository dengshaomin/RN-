/* @flow */

import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image
} from 'react-native';

// 控制类
import ShoppingCartControl from '../Tool/ShoppingCartControl';

// mobx
import {observer} from 'mobx-react';
import {observable} from 'mobx';

// 购物车子组件
import ShopItem from '../Component/ShoppingCart/ShopItem';


@observer
export default class ShoppingCart extends PureComponent {

  constructor(props){
    super(props)
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
    if (item.type == 'shopData') {
      var array = []
      for (var a in item.viewData){
        array.push(
          <ShopItem data={item.viewData[a]}/>
        )
      }
      return array
    }
  }

  // 返回FlatList Key
  _keyExtractor = (item, index) => 'ShoppingCart' + index;


  render() {
    return (
      <View style={styles.container}>
        {/* 头部 */}
        <View style={styles.headerView}>
          <Text style={styles.headerTitle}>购物车</Text>
          {/* 编辑 */}
          {ShoppingCartControl.editStatus == false
            ?<Text style={styles.headerRight} onPress={()=>ShoppingCartControl.editStatus=!ShoppingCartControl.editStatus}>编辑</Text>
            :<Text style={styles.headerRight} onPress={()=>ShoppingCartControl.editStatus=!ShoppingCartControl.editStatus}>完成</Text>
          }
        </View>

        <View style={{marginTop:50,}}></View>
        {/* 购物菜单 */}
        <FlatList
          data={ShoppingCartControl.shopData}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />

        {/* 标题漂浮物 */}
        <View style={styles.titleFloaterView}>
          <Text style={{color:'rgb(243,131,0)'}}>登录后可同步电脑和手机购物车中的商品      ></Text>
        </View>

        {/* 订单漂浮物 */}
        <View style={styles.orderFloaterView}>

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
    position:'absolute',
    bottom:0,width:'100%',
    justifyContent:'center',alignItems:'center',
    backgroundColor:'white'
  }
});
