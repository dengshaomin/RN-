/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Alert
} from 'react-native';

const {width} = Dimensions.get('window')

export default class Search extends Component {

  constructor(props){
    super(props)
    this.data = [
      '全场满199减30',
      '配件换季特惠',
      '母婴限时冰点价',
      '休闲鞋',
      '黑凤梨',
      '背心满118减20',
      '夏凉被',
      '双肩包',
      '收纳',
      '睡衣',
      '数据线买3送2',
      'CK制造商'
    ]
  }

  // 取消按钮被按下
  _goBack = () =>{
    var {goBack} = this.props.navigation
    goBack()
  }

  // 热门搜索Item被按下
  _hotSearchDown = () =>{
    alert('热门搜索Item被按下')
  }

  // 渲染热门搜索
  renderHotSearch = () =>{
    return this.data.map((el,index)=>{
      let random = Math.random()
      return (
        <TouchableOpacity style={random>0.5?styles.hotSearchItemShow:styles.hotSearchItemHidden} onPress={this._hotSearchDown}>
          <Text style={{color:random>0.5?'rgb(164,0,0)':'black'}}>{' '+ el + ' '}</Text>
        </TouchableOpacity>
      )
    })
  }

  render() {
    return (
      <View style={styles.container}>

        {/* 搜索头部 */}
        <View style={styles.searchView}>
          <View style={styles.searchInputView}>
            <Text style={{fontFamily:'iconfont',fontSize:20,marginLeft:10}}>&#xe637;</Text>
            <TextInput
              style={{flex:1,marginLeft:5,marginRight:10,height:40}}
              placeholder="买日式电动牙刷送夏季果冻鞋"
              underlineColorAndroid='transparent'
              autoFocus={true}
            />
          </View>

          {/* 取消按钮 */}
          <TouchableOpacity style={styles.searchBackView} onPress={this._goBack}>
            <Text style={styles.searchBack}>取消</Text>
          </TouchableOpacity>
        </View>

        {/* 热门搜索 */}
        <View style={styles.hotSearchView}>
          <Text>热门搜索</Text>
          <View style={styles.hotSearch}>
            {this.renderHotSearch()}
          </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchView:{
    height:40,
    backgroundColor:'white',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row'
  },
  searchInputView:{
    marginLeft:10,marginRight:10,
    borderRadius:5,
    width:width-60,height:30,
    backgroundColor:'rgb(234,234,234)',
    justifyContent:'center',alignItems:'center',
    flexDirection:'row'
  },
  searchBackView:{
    width:40,height:25
  },
  searchBack:{
    color:'black'
  },
  hotSearchView:{
    marginLeft:15,marginTop:10
  },
  hotSearch:{
    flexDirection:'row',
    flexWrap:'wrap',
    width:230
  },
  hotSearchItemShow:{
    marginLeft:10,marginTop:10,
    borderColor:'rgb(164,0,0)',
    borderWidth:1,
    borderRadius:2
  },
  hotSearchItemHidden:{
    marginLeft:10,marginTop:10,
    borderColor:'rgb(174,174,174)',
    borderWidth:1,
    borderRadius:2
  }
});
