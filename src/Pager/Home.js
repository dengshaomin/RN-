/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Alert,
  ScrollView
} from 'react-native';

import BaseNavigationBar from '../Comm/BaseNavigationBar';
import ScrollTabViewItem from '../Component/Home/scrollTabViewItem';

import {observable} from 'mobx';
import {observer} from 'mobx-react/native';


const {width,height} = Dimensions.get('window')

@observer
export default class Home extends Component {

  @observable scollItemIndex = 0

  constructor(props){
    super(props)
    this.data = ['推荐','限时购','居家','餐厨','配件','服装','洗护','婴童','杂货','饮食','志趣']
  }
  static navigationOptions = {
    title: '首页',
    tabBarIcon:({tintColor}) => (
      <View style={styles.iconView}>
        <Text style={[styles.icon,{color:tintColor}]}>&#xe604;</Text>
      </View>
    )
  }

  // 左侧按钮被按下
  _leftButtonDown = () =>{
    alert('左侧图标按下')
  }

  // 右侧按钮被按下
  _rightButtonDown = () =>{
    alert('右侧图标按下')
  }

  // 编辑框获取焦点
  _inputFocus = () =>{
      var {navigate} = this.props.navigation
      navigate('Search')
  }

  // 滚动条被按下
  _scrollDown = (i) =>{
    this.scollItemIndex = i
  }

  // 滚动TabView标题渲染
  _renderScollTabView = () =>{
    return <ScrollTabViewItem data={this.data} index={this.scollItemIndex} onPress={this._scrollDown}/>
  }

  render() {
    return (
      <View style={styles.container}>

        {/* 头部 */}
        <View style={styles.headerView}>
          {/* 左边Icon图标 */}
          <TouchableOpacity style={styles.headerLeftView}>
            <Text style={{fontFamily:'iconfont',fontSize:22,}}>&#xe662;</Text>
            <Text>扫一扫</Text>
          </TouchableOpacity>

          {/* 中间搜索 */}
          <View style={styles.headerBodyView}>
            <View style={styles.headerBody}>
              <Text style={{fontFamily:'iconfont',fontSize:20,}}>&#xe637;</Text>
              <Text style={{color:'rgb(147,147,147)',fontSize:16,marginLeft:5}} onPress={this._inputFocus}>搜索商品,共5207款好物</Text>
            </View>
          </View>

          {/* 右边Icon图标 */}
          <TouchableOpacity style={styles.headerLeftView}>
            <Text style={{fontFamily:'iconfont',fontSize:22,}}>&#xe705;</Text>
            <Text>消息</Text>
          </TouchableOpacity>
        </View>

        {/* 滚动TabView */}
        <View style={styles.scrollTabView}>
          <View style={styles.scrollView}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              >
              {this._renderScollTabView()}
            </ScrollView>
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
  headerView:{
    height:50,
    backgroundColor:'white',
    flexDirection:'row'
  },
  headerLeftView:{
    height:50,
    width:50,
    justifyContent:'center',
    alignItems:'center',
  },
  headerBodyView:{
    marginLeft:10,
    width:width-110,
    height:50,
    justifyContent:'center',
    alignItems:'center'
  },
  headerBody:{
    width:width-110,
    height:35,
    backgroundColor:'rgb(234,234,234)',
    borderRadius:5,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  scrollTabView:{
    flex:1,
    backgroundColor:'red'
  },
  scrollView:{
    backgroundColor:'white',
    height:30
  },
  iconView:{
    alignSelf:'center',
    flex:1,
  },
  icon:{
    fontFamily:'iconfont',
    fontSize:25,
  }
});
