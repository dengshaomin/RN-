/* @flow */

/* @flow */

import React from 'react';
import {
  AppRegistry,
  AppState
} from 'react-native';



import SplashScreen from 'react-native-splash-screen'
import {StackNavigator,TabNavigator,NavigationActions} from 'react-navigation';
// import TabNavigator from './Comm/TabBarView';

// HomeTab 路由组件
import Home from './Pager/Home'; //首页
import Special from './Pager/Special'; //专题
import Classification from './Pager/Classification'; //分类
import ShoppingCart from './Pager/ShoppingCart'; //购物车
import Personal from './Pager/Personal'; //个人

// 跳转页面路由
import Search from './Pager/Search';         //搜索页面
import QRScan from './Pager/QRScan';        //二维码扫描
import Message from './Pager/Message';      //消息页面
import Manufacturer from './Pager/Manufacturer';  //制造商页面
import CommodityInformation from './Pager/CommodityInformation'; //商品信息
import Login from './Pager/Login';

// 用户信息Store
import UserInfoStore from './Store/UserInfoStore';




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
  "Message":{screen:Message},
  "Manufacturer":{screen:Manufacturer},
  "CommodityInformation":{screen:CommodityInformation},
  "Login":{screen:Login}
  },
  {
    headerMode:'screen'
  }
)

const defaultGetStateForAction = HomeTab.router.getStateForAction;
const defaultgetComponentForRouteName = HomeTab.router.getComponentForState;

HomeTab.router.getComponentForState = (state) =>{
  console.log('getActionForPathAndParams',state);
  return defaultgetComponentForRouteName(state)
}


HomeTab.router.getStateForAction = (action, state) => {
  if (action.routeName === 'PersonalStack' && UserInfoStore.userState == false) {
    const routes = [
      ...state.routes,
      {key: 'A', routeName: 'Login', },
    ];
    return {
      ...state,
      routes,
      index: routes.length - 1,
    };
  }

  return defaultGetStateForAction(action, state);
};


AppRegistry.registerComponent('WY_YX', () => HomeTab);
