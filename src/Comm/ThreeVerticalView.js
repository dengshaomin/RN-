/* @flow */

import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';

const {width} = Dimensions.get('window')

export default class ThreeVerticalView extends PureComponent {
  // 商品点击跳转
  _ImgDown = () =>{
    global.navigation.navigate('CommodityInformation')
  }

  // 渲染推荐数据
  _renderData = () =>{
    return this.props.data.viewData.map((el,i)=>{
      return (
        <TouchableOpacity key={'ThreeVerticalView'+i} style={styles.mainView} onPress={this._ImgDown}>
          <View style={styles.itemView}>
            <Image source={{uri:el.img}} style={{width:100,height:100}}></Image>
          </View>
          <View style={styles.itemTextView}>
            <Text style={{color:'black'}}>{el.shopName}</Text>
            <Text style={{color:'rgb(164,0,0)'}}>{el.price}</Text>
          </View>
        </TouchableOpacity>
      )
    })

  }

  render() {
    const {height} = this.props
    return (
      <View style={[styles.container,{height}]}>
        {/* 三格视图标题部分 */}
        <TouchableOpacity style={styles.titleView} onPress={this._headerTitleDown}>
          <Text style={{color:'black'}}>
            {`${this.props.data.title}  `}
            <Text style={{fontFamily:'iconfont',fontSize:17,color:'rgb(174,174,174)'}}>&#xe664;</Text>
          </Text>
        </TouchableOpacity>

        {/* 渲染列表数据 */}
        {this._renderData()}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height:250,
    marginTop:10,
    backgroundColor:'white'
  },
  titleView:{
    height:50,
    justifyContent:'center',alignItems:'center',
    borderBottomColor:'rgb(147,147,147)',borderBottomWidth:0.2
  },
  mainView:{
    flex:1,
    borderBottomColor:'rgba(147,147,147,0.5)',
    borderBottomWidth:0.15,
    flexDirection:'row',
  },
  itemView:{
    flex:1,
    justifyContent:'center',alignItems:'center'
  },
  itemTextView:{
    flex:1,
    justifyContent:'center'
  }
});
