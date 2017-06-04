/* @flow */

import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image
} from 'react-native';

// 工具类
import scrollControl from '../Tool/scrollControl';


const {width} = Dimensions.get('window')

export default class ScrollItemView extends PureComponent {

  // 开始渲染component
  _renderComponent = () =>{
    const {height} = this.props
    return this.props.scrollData.map((el,i)=>{
      return (
        <View key={'scrollData'+i} style={styles.scrollItemView}>
          <Image  source={{uri:el.img}} style={{width,height}}></Image>
        </View>
      )
    })
  }

  // 触摸开始
  _onTouchStart = (e) =>{
    console.log('onTouchStart',e.nativeEvent);
    scrollControl.screenEnable = false
  }

  // 一帧结束后调用
  _onMomentumScrollEnd = () =>{
    scrollControl.screenEnable = true
  }

  render() {
    const {height} = this.props

    return (
      <View style={[styles.container,{height}]}>
              <ScrollView
                horizontal={true}
                pagingEnabled={true}
                removeClippedSubviews={true}
                showsHorizontalScrollIndicator={false}
                // onTouchStart={this._onTouchStart}
                onTouchStart={this._onTouchStart}
                onMomentumScrollEnd={this._onMomentumScrollEnd}
                >
                {this._renderComponent()}
              </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width,height:160,
  },
  scrollItemView:{
    flex:1
  }
});
