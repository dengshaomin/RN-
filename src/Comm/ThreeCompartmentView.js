/* @flow */

import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';

const {width} = Dimensions.get('window')

export default class ThreeCompartmentView extends PureComponent {

  //头部标题被点击
  _headerTitleDown = () =>{
    // console.log('props',this.props);
    this.props.navigation.navigate('Manufacturer')
  }

  // 点击图片进行跳转
  _ImgDown = () =>{

  }
  render() {
    const {height,data} = this.props
    return (
      <View style={[styles.container,{height}]}>

        {/* 三格视图标题部分 */}
        <TouchableOpacity style={styles.titleView} onPress={this._headerTitleDown}>
          <Text style={{color:'black'}}>
            {`${this.props.data.title}  `}
            <Text style={{fontFamily:'iconfont',fontSize:17,color:'rgb(174,174,174)'}}>&#xe664;</Text>
          </Text>
        </TouchableOpacity>

        {/* 三格视图主体部分 */}
        <View style={styles.threeComponentView}>
          {/* 左侧部分 */}
          <TouchableOpacity onPress={this._ImgDown} style={styles.leftView}>
            <Image resizeMode={Image.resizeMode.stretch} source={{uri:data.viewData[0].img}} style={{width:width/2-5,height:height-40-5}}>
              <Text style={{color:'black'}}>{data.viewData[0].shopName}</Text>
              <Text>{data.viewData[0].price}</Text>
            </Image>
          </TouchableOpacity>

          {/* 右侧部分 */}
          <View style={styles.rightView}>
            <TouchableOpacity onPress={this._ImgDown}>
              <Image resizeMode={Image.resizeMode.stretch} source={{uri:data.viewData[1].img}} style={{width:width/2-5,height:(height-40)/2-5}}>
                <Text style={{color:'black'}}>{data.viewData[1].shopName}</Text>
                <Text>{data.viewData[1].price}</Text>
              </Image>
            </TouchableOpacity>

            <TouchableOpacity onPress={this._ImgDown}>
              <Image resizeMode={Image.resizeMode.stretch} source={{uri:data.viewData[2].img}} style={{marginTop:5,width:width/2-5,height:(height-40)/2-5}}>
                <Text style={{color:'black'}}>{data.viewData[2].shopName}</Text>
                <Text>{data.viewData[2].price}</Text>
              </Image>
            </TouchableOpacity>

          </View>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height:200,
    backgroundColor:'white'
  },
  titleView:{
    height:40,
    justifyContent:'center',alignItems:'center'
  },
  threeComponentView:{
    flexDirection:'row',
    flex:1,
  },
  leftView:{
    flex:1,
  },
  rightView:{
    flex:1
  }
});
