/* @flow */

/* @flow */

import React from 'react';
import {
  AppRegistry,
  AppState
} from 'react-native';



import SplashScreen from 'react-native-splash-screen'
import {StackNavigator,TabNavigator} from 'react-navigation';
// import TabNavigator from './Comm/TabBarView';

// HomeTab 路由组件
import Home from './Pager/Home'; //首页
import Special from './Pager/Special'; //专题
import Classification from './Pager/Classification'; //分类
import ShoppingCart from './Pager/ShoppingCart'; //购物车
import Personal from './Pager/Personal'; //个人

// 跳转页面路由
import Search from './Pager/Search';
import QRScan from './Pager/QRScan';
import Message from './Pager/Message';





AppState.addEventListener('change', (nextAppState)=>{
  if (nextAppState === 'active'){
    if (global.init === true){
      SplashScreen.hide();
    }}
});


const SimApp = TabNavigator({
  "HomeStack":{screen:Home},
  "SpecialStack":{screen:Special},
  "ClassificationStack":{screen:Classification},
  "ShoppingCartStack":{screen:ShoppingCart},
  "PersonalStack":{screen:Personal}
},
  {
    initialRouteName:'HomeStack',
    // tabBarComponent:TabNavigator.TabBarBottom,
    tabBarPosition:'bottom',
    swipeEnabled:false,
    animationEnabled:false,
    lazy:true,
    tabBarOptions: {
      showIcon:true,
      showLabel:true,
      indicatorStyle:{backgroundColor:'rgb(249,249,249)'},
      activeTintColor: 'rgb(164,0,0)', // 文字和图片选中颜色
      inactiveTintColor: 'rgb(106,106,106)', // 文字和图片默认颜色
      style: {
        height:60,
        backgroundColor: 'rgb(249,249,249)',
      },
    }
  }
)

const HomeTab = StackNavigator({
  "HomeTab":{screen:SimApp},
  "Search":{screen:Search},
  "QRScan":{screen:QRScan},
  "Message":{screen:Message}
  },
  {
    headerMode:'none'
  }
)

AppRegistry.registerComponent('WY_YX', () => HomeTab);
