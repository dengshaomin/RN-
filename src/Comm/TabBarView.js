/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import TabBarTop from './TabBarTop';
import TabBarBottom from './TabBarBottom';
import TabBarPager from './TabBarPager';




const TabNavigator = (
  tabBarComponent,
  tabBarOptions
) => {

  class TabBarView extends Component {


    // 渲染页面
    _renderPager = () =>{

    }

    // 渲染图标
    _renderIcon = () =>{

    }

    // 渲染标题
    _renderLabel = () =>{

    }

    render(){
      console.log(tabBarOptions);

      return (
        <View style={{flex:1,}}>
          {
          tabBarOptions.tabBarPosition === 'bottom' ?
          <View style={{flex:1,}}>
            <TabBarPager {...tabBarComponent} />
            <TabBarBottom {...tabBarOptions} />
          </View>
          :
          <View style={{flex:1,}}>
            <TabBarTop {...tabBarOptions} />
            <TabBarPager {...tabBarComponent} />
          </View>
          }
        </View>
      )
    }
  }

  return TabBarView
}

export default TabNavigator
