/* @flow */

import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';

const {width} = Dimensions.get('window')

// 数据接口
import ClassificationData from '../Store/ClassificationData';


// 组件
import ScrollingSide from '../Component/Classification/ScrollingSide';



// ------------------------


export default class Classification extends PureComponent {

  static navigationOptions = {
    title: '分类',
    header:null,
    tabBarIcon:({tintColor}) => (
      <View style={styles.iconView}>
        <Text style={[styles.icon,{color:tintColor}]}>&#xe691;</Text>
      </View>
    )
  }

  constructor(props){
    super(props)
    this.data = ClassificationData
  }

  // 搜索按钮被按下
  _inputFocus = () =>{
    global.navigation.navigate('Search')
  }

  render() {
    return (
      <View style={styles.container}>
        {/* 中间搜索 */}
        <View style={styles.headerView}>
          <View style={styles.headerBodyView}>
            <View style={styles.headerBody}>
              <Text style={{fontFamily:'iconfont',fontSize:20,}}>&#xe637;</Text>
              <Text style={{color:'rgb(147,147,147)',fontSize:16,marginLeft:5}} onPress={this._inputFocus}>搜索商品,共5207款好物</Text>
            </View>
          </View>
        </View>

        <ScrollingSide data={this.data}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  headerView:{
    borderBottomWidth:0.5,
    borderBottomColor:'rgba(147,147,147,0.4)'
  },
  headerBodyView:{
    marginLeft:10,
    width:width,
    height:50,
    justifyContent:'center',
    alignItems:'flex-start',
  },
  headerBody:{
    width:width-20,
    height:35,
    backgroundColor:'rgb(234,234,234)',
    borderRadius:5,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  iconView:{
    justifyContent:'center',
    flex:1,
  },
  icon:{
    fontFamily:'iconfont',
    fontSize:25,
  }
});
