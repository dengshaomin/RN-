/* @flow */

import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  PanResponder
} from 'react-native';


// 获取宽高
const {width,height} = Dimensions.get('window')

// mobx初始化
import {observer} from 'mobx-react';
import {observable} from 'mobx';

// 控制接口初始化
import ScrollingSideControl from '../../Tool/ScrollingSideControl';

@observer
export default class ScrollingSide extends PureComponent {

  @observable scrollPos = 0

  constructor(props){
    super(props)
    this.state = {
      animatedValue:new Array(9).fill({value:new Animated.Value(0)})
    }

    this.initPos = 0
    this._panResponder = PanResponder.create({
      // 要求成为响应者：
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {

        this.initPos = evt.nativeEvent.pageY

        console.log('手势开始',evt.nativeEvent,gestureState.dy);
      },
      onPanResponderMove: (evt, gestureState) => {

        var pos = evt.nativeEvent.pageY - this.initPos
        console.log('pos',pos);
        console.log('evt.nativeEvent.pageY',evt.nativeEvent.pageY);
        console.log('this.initPos',this.initPos);
        // console.log('nativeEvent',evt.nativeEvent,gestureState,evt.nativeEvent.locationY,this.initPos,pos);

        this.state.animatedValue[this.scrollPos].value.setValue(pos)

        // console.log('手势移动',evt.nativeEvent,gestureState.dy,gestureState.moveY);
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {

        console.log('this.scrollPos',this.scrollPos);
        console.log('this.props.data.length',this.props.data.length);

        var pos = evt.nativeEvent.pageY - this.initPos
        if (pos > -100) {
          if (this.scrollPos > 0) {
                this.state.animatedValue[this.scrollPos].value.setValue(0)
                this.scrollPos -=1
                this.refs.ScrollView.scrollTo({y:(height-100)*this.scrollPos,animated:false})
          }else {
                this.state.animatedValue[this.scrollPos].value.setValue(0)
          }
        }else {
          if (this.scrollPos +1 < this.props.data.length) {
                this.state.animatedValue[this.scrollPos].value.setValue(0)
                this.scrollPos +=1
                this.refs.ScrollView.scrollTo({y:(height-100)*this.scrollPos,animated:false})
          }else {
            this.state.animatedValue[this.scrollPos].value.setValue(0)
          }
        }
      },
    });

  }
  // 左侧item被按下
  _leftMenuItemDown = (i) =>{
    this.refs.ScrollView.scrollTo({y:i*(height-100)})
    this.scrollPos = i
  }

  // 渲染左侧菜单
  _renderLeftMenu = () =>{
    return this.props.data.map((el,i)=>{
      return (
        <TouchableOpacity key={'leftMenu' + i} style={styles.leftMenuItemView} onPress={this._leftMenuItemDown.bind(this,i)}>
          <Text style={{color:this.scrollPos==i?'rgb(164,0,0)':'black'}}>{el.title}</Text>
        </TouchableOpacity>
      )
    })
  }

  // 渲染右侧子组件
  _renderRightItemComponent = (data) =>{
    return data.map((el,i)=>{
      return (
          <TouchableOpacity key={'RightItemComponent'+i} style={{height:80,width:(width-80)/3,justifyContent:'center',alignItems:'center'}}>
            <Image source={{uri:el.img}} style={{borderRadius:25,width:50,height:50}}/>
            <Text>{el.name}</Text>
          </TouchableOpacity>
      )
    })
  }

  // 渲染右侧主菜单组件
  _renderRightComponent = () =>{
    return this.props.data.map((el,i)=>{
      return (
          <Animated.View key={'rightMenu'+i} style={[styles.rightMenuView,{height:height-100,transform:[{
            translateY:this.state.animatedValue[i].value
          }]}]}  {...this._panResponder.panHandlers}>
            <Image source={{uri:el.viewImg}} style={{marginLeft:10,marginRight:10,marginTop:10,height:120}}/>
            <Text style={{marginTop:20,textAlign:'center',color:'black'}}>{`--${el.title}分类--`}</Text>
            <View style={styles.rightItemComponentView}>
              {this._renderRightItemComponent(el.viewData)}
            </View>
          </Animated.View>
      )
    })
  }

  // 手势开始事件
  _onTouchStart = () =>{
    ScrollingSideControl.scrollEnabled = false
  }

  render() {
    return (
      <View style={styles.container} >
        {/* 左侧菜单 */}
        <View style={[styles.leftMenu]}>
          {this._renderLeftMenu()}
          {/* 红色滑块条 */}
          <View style={[styles.leftMenuSliderView,{top:20+(this.scrollPos*50)}]}></View>
        </View>

        {/* 右侧菜单 */}
          <ScrollView
            ref='ScrollView'
            scrollEnabled={false}
            pagingEnabled={true}
            removeClippedSubviews={true}
            showsVerticalScrollIndicator={false}
            onScroll={this._onScroll}
            onTouchMove={this._onTouchMove}
            >
            {this._renderRightComponent()}
          </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row'
  },
  leftMenu:{
    width:80,
    borderRightColor:'rgb(147,147,147)',borderRightWidth:0.5,
    alignItems:'center'
  },
  rightMenu:{
    flex:1
  },
  leftMenuSliderView:{
    position:'absolute',
    width:2,height:30,
    left:1,
    backgroundColor:'rgb(164,0,0)'
  },
  leftMenuItemView:{
    marginTop:20,
    height:30,
    justifyContent:'center',alignItems:'center'
  },
  rightMenuView:{
    // justifyContent:'space-around',
    // alignContent:'space-around'
  },
  rightItemComponentView:{
    flex:1,
    flexDirection:'row',flexWrap:'wrap',
    justifyContent:'flex-start',
    alignContent:'flex-start'
  }
});
