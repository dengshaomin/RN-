/* @flow */

import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Alert,
  ScrollView,
  Platform
} from 'react-native';

import BaseNavigationBar from '../Comm/BaseNavigationBar';
import ScrollTabView from '../Component/Home/scrollTabView';

//mobx
// import {observable} from 'mobx';
// import {observer} from 'mobx-react/native';

// 热更新
import {
  isFirstTime,
  isRolledBack,
  packageVersion,
  currentVersion,
  checkUpdate,
  downloadUpdate,
  switchVersion,
  switchVersionLater,
  markSuccess,
} from 'react-native-update';

import _updateConfig from '../../update.json';
const {appKey} = _updateConfig[Platform.OS];

//SplashScreen启动
import SplashScreen from 'react-native-splash-screen'

const {width,height} = Dimensions.get('window')

// @observer
export default class Home extends PureComponent {

  constructor(props){
    super(props)
    global.navigation = this.props.navigation
  }



  componentDidMount() {
    SplashScreen.hide()
  }

  static navigationOptions = {
    title: '首页',
    header:null,
    tabBarIcon:({tintColor}) => (
      <View style={styles.iconView}>
        <Text style={[styles.icon,{color:tintColor}]}>&#xe604;</Text>
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

  // 礼物被按下
  _giftDwon = () =>{
    alert('礼物被按下')
  }

  render() {
    console.log('home刷新');
    let {navigate} = this.props.navigation

    return (
      <View style={styles.container}>

        {/* 头部 */}
        <View style={styles.headerView}>
          {/* 左边Icon图标 */}
          <TouchableOpacity style={styles.headerLeftView} onPress={()=>navigate('QRScan')}>
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
          <TouchableOpacity style={styles.headerLeftView} onPress={()=>navigate('Message')}>
            <Text style={{fontFamily:'iconfont',fontSize:22,}}>&#xe705;</Text>
            <Text>消息</Text>
          </TouchableOpacity>
        </View>

        {/* 滚动TabView */}
        <View style={styles.scrollTabView}>

          {/* 滚动Tab主体 */}
          <ScrollTabView navigation={this.props.navigation}/>

          {/* 漂浮的礼物 */}
          <TouchableOpacity style={styles.giftView} onPress={this._giftDwon}>
            <Text style={{fontFamily:'iconfont',fontSize:30,color:'rgb(164,0,0)'}}>&#xe68e;</Text>
          </TouchableOpacity>
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
  },
  scrollView:{
    backgroundColor:'white',
    height:30
  },
  giftView:{
    position:'absolute',
    backgroundColor:'rgba(255,255,255,0.9)',
    borderWidth:1,borderColor:'rgba(147,147,147,0.5)',
    width:40,height:40,
    borderRadius:20,
    right:20,
    bottom:50,
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
