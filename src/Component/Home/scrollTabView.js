/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions
} from 'react-native';

import Recommend from './Recommend'; //推荐
import LimitedTime from './LimitedTime';  //限时购
import HomeFeeling from './HomeFeeling';  //居家
import Kitchen from './Kitchen';  //餐厨
import Parts from './Parts';  //配件
import Clothing from './Clothing';  //服装
import PersonalCare from './PersonalCare'; //洗护
import Baby from './Baby';  //婴童
import Groceries from './Groceries';  //杂货
import Diet from './Diet';  //饮食
import Interest from './Interest'; //志趣


import {observer} from 'mobx-react/native';
import {observable} from 'mobx';


const {width,height} = Dimensions.get('window')

@observer
export default class ScrollTabView extends Component {

  @observable scrollPos = 0

  constructor(props){
    super(props)
    this.data = [
      {title:'推荐',screen:Recommend},
      {title:'限时购',screen:LimitedTime},
      {title:'居家',screen:HomeFeeling},
      {title:'餐厨',screen:Kitchen},
      {title:'配件',screen:Parts},
      {title:'服装',screen:Clothing},
      {title:'洗护',screen:PersonalCare},
      {title:'婴童',screen:Baby},
      {title:'杂货',screen:Groceries},
      {title:'饮食',screen:Diet},
      {title:'志趣',screen:Interest}
  ]
}

  // 滚动条文本被按下
  _scrollTextDown = (i) =>{
    if (this.scrollPos != i) {
      this.refs.scrollItem.scrollTo({x:(i)*width,animated:true})
    }
  }

  // 移动手指时触发
  _scrollItemMove = (e) =>{
    // console.log(e.nativeEvent);
    // this.scrollPos = e.nativeEvent.locationX
  }

  //滚动条滚动事件
  _scrollItemScrollEvent = (e) =>{

    var length = e.nativeEvent.contentSize.width
    var offset = e.nativeEvent.contentOffset.x
    var itemSize = 70 * 11

    var pos = offset / length * itemSize

    if (offset > width * 5) {
      this.refs.scrollView.scrollTo({x:pos - 70 ,animated:true})
    }else if (pos / 70 <=4) {
      this.refs.scrollView.scrollTo({x:pos - 70,animated:true})
    }

    this.scrollPos = pos / 70
  }

  // 渲染scrollTabView
  _renderScollTabView = () => {
    return this.data.map((el,index)=>{
      var pos = Math.round(this.scrollPos)
      return (
        <View style={styles.scrollTabView}>
          <Text onPress={this._scrollTextDown.bind(this,index)} style={pos===index?styles.scrollTextShow:styles.scrollTextHidden}>{el.title}</Text>
        </View>
      )
    })
  }

  // 渲染scrollTabViewItem
  _renderScollTabItemView = () =>{
    return this.data.map((el,index)=>{
      var Comp = el.screen
      return <Comp style={{width:width,}}/>
    })
  }

  render() {

    return (
      <View style={styles.container}>

        {/* 渲染scrollTabView */}
        <View style={{height:30}}>
          <ScrollView
            ref='scrollView'
            style={{height:30,backgroundColor:'white'}}
            showsHorizontalScrollIndicator={false}
            horizontal={true}>
            {this._renderScollTabView()}
            <View style={{position:'absolute',left:this.scrollPos*70,bottom:0,width:70,height:2,backgroundColor:'rgb(164,0,0)'}}></View>
          </ScrollView>
        </View>


        {/* 渲染scrollTabViewItem */}
        <View style={{flex:1}}>
          <ScrollView
            ref='scrollItem'
            showsHorizontalScrollIndicator={false}
            removeClippedSubviews={true}
            pagingEnabled={true}
            horizontal={true}
            onTouchMove={this._scrollItemMove}
            onScroll={this._scrollItemScrollEvent}
            >
            {this._renderScollTabItemView()}
          </ScrollView>
        </View>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollTabView:{
    width:70,
    justifyContent:'center',
    alignItems:'center'
  },
  scrollTextShow:{
    color:'rgb(164,0,0)'
  },
  scrollTextHidden:{
    color:'rgb(106,106,106)'
  }
});
