/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from 'react-native';

// 获取推荐页面数据
import RecommendData from '../../Store/RecommendData';

// 所有组件
import ScrollItemView from '../../Comm/ScrollItemView';
import ThreeCompartmentView from '../../Comm/ThreeCompartmentView';
import NewStarter from '../../Comm/NewStarter';
import ThreeVerticalView from '../../Comm/ThreeVerticalView';


// 接口类
import scrollControl from '../../Tool/scrollControl';


//-------------------------------------------------------

const {width} = Dimensions.get('window')

export default class Recommend extends Component {

  constructor(props){
    super(props)

    this.state = {
      iconShow:'none'
    }

    this.data = RecommendData

    this.scrollData = this.data['scrollData']

    // 三格数据列表数据
    this.ThreeCompartmentViewData = this.data['threeCompartmentData']

    // 头部说明数据
    this.HeadDescriptionData = ['网易自营品牌','30天无忧退货','48小时快速退款']

    // 周一周四.新品首发
    this.newStarterData = this.data['newStarter']

    // 人气推荐
    this.threeVerticalViewData = this.data['threeVerticalViewData']
  }

  // 渲染头部说明数据
  _renderHeadDescriptionView = () =>{
    return this.HeadDescriptionData.map((el,i)=>{
      return (
        <View key={'HeadDescriptionData'+i} style={styles.headDescriptionItem}>
          <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontFamily:'iconfont',fontSize:13,color:'rgb(164,0,0)',justifyContent:'center'}}>&#xe61b;</Text>
            <Text style={styles.headDescriptionItemTitle}>{el}</Text>
          </View>
        </View>
      )
    })
  }

  // icon按钮被点击
  _iconDown = () =>{
    this.refs._scrollView.scrollTo({y:0,animated:true})
  }

  // 滚动条移动时消息事件
  _onScroll = (e) =>{
    if (e.nativeEvent.contentOffset.y > 500) {
      if (this.state.iconShow != 'flex') {
        this.setState({
          iconShow:'flex'
        })
      }
    }else {
      if (this.state.iconShow !='none') {
        this.setState({
          iconShow:'none'
        })
      }
    }

  }

  render() {
    return (
      <View style={[styles.container,this.props.style]}>

        <ScrollView
          ref='_scrollView'
          onScroll={this._onScroll}
          showsVerticalScrollIndicator={false}
          screenEnable={scrollControl.screenEnable}>

          {/* 头部滚动条 */}
          <ScrollItemView
            height={240}
            scrollData={this.scrollData}/>

          {/* 头部介绍 */}
          <View style={styles.headDescriptionView}>
            {this._renderHeadDescriptionView()}
          </View>

          {/* 三格商品视图 */}
          <ThreeCompartmentView
            height={260}
            navigation={this.props.navigation}
            data={this.ThreeCompartmentViewData}/>

          {/* 新品首发 */}
          <NewStarter height={300} data={this.newStarterData}/>

          {/* 三格视图 -- 竖 */}
          <ThreeVerticalView height={350} data={this.threeVerticalViewData}/>

        </ScrollView>

        {/* 互动到顶部 */}
        <TouchableOpacity style={[styles.moveTopButton,{display:this.state.iconShow}]} onPress={this._iconDown}>
          <Text style={styles.icon}>&#xe645;</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width,
  },
  moveTopButton:{
    position:'absolute',
    bottom:7,right:23,
    borderRadius:17.5,
    width:35,height:35,
    backgroundColor:'rgba(255,255,255,0.8)',
    borderColor:'rgb(147,147,147)',borderWidth:1,
    justifyContent:'center',alignItems:'center'
  },
  icon:{
    fontFamily:'iconfont',
    fontSize:22,
  },
  headDescriptionView:{
    flexDirection:'row',
    height:35,
    backgroundColor:'white'
  },
  headDescriptionItem:{
    flex:1,
    justifyContent:'center',alignItems:'center',
  },
  headDescriptionItemTitle:{
    marginLeft:5,
    color:'black',
    fontSize:13
  }
});
