/* @flow */

import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList
} from 'react-native';

// 数据接口
import SpecialData from '../Store/SpecialData';

export default class Special extends PureComponent {
  static navigationOptions = {
    title: '专题',
    headerStyle:{
      elevation:1
    },
    headerTitleStyle:{
      alignSelf:'center',
      fontWeight:'200'
    },
    tabBarVisible:true,
    tabBarIcon:({tintColor}) => (
      <View style={styles.iconView}>
        <Text style={[styles.icon,{color:tintColor}]}>&#xe744;</Text>
      </View>
    )
}
  constructor(props){
    super(props)
    this.state = {
      data:SpecialData
    }
  }

  // 渲染纵向数据
  _renderVerticalScrollView = (data) =>{
    return data.map((el,i)=>{
      return (
        <View key={'renderVerticalScrollView'+i}>
          <View style={{marginLeft:20,height:50,backgroundColor:'white',flexDirection:'row',alignItems:'center'}}>
            <Image source={{uri:el.iconImg}} style={{width:30,height:30,borderRadius:15}}/>
            <Text style={{color:'black',marginLeft:10}}>{el.userName}</Text>
          </View>
            <Image source={{uri:el.viewImg}} style={{height:200}}/>
            <Text style={{color:'black',fontSize:18}}>{el.topicTt}</Text>
            <Text>{el.topicDes}</Text>
        </View>
      )
    })
  }

  // 渲染横向scroll数据
  _renderScrollView = (data) => {
    return data.map((el,i)=>{
      return (
        <Image key={'renderScrollView'+i} source={{uri:el.img}} style={{borderRadius:5,marginLeft:20,width:120,height:70}}>
          <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text style={{backgroundColor:'transparent',color:'white'}}>{el.name}</Text>
          </TouchableOpacity>
        </Image>
      )
    })
  }

  // 渲染FlatListItem
  _renderItem = ({item,index}) =>{
      if (item.type == 'scroll') {
        return (
          <ScrollView key={'renderComponent'+index} horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.scrollDataView}>
              {this._renderScrollView(item.viewData)}
            </View>
          </ScrollView>
        )
      }else {
        return (
          <View style={{marginTop:20,height:300,backgroundColor:'white'}}>
            {this._renderVerticalScrollView(item.viewData)}
          </View>
        )
      }
  }

  // FlatList滚动到底部
  _onEndReached = () =>{
    this.setState({
      data:this.state.data.concat(SpecialData[1])
    })
  }

  // 返回FlatList Key
  _keyExtractor = (item, index) => 'SpecialData' + index;

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          onEndReached={this._onEndReached}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconView:{
    justifyContent:'center',
    flex:1,
  },
  icon:{
    fontFamily:'iconfont',
    fontSize:25,
  },
  scrollDataView:{
    height:100,
    backgroundColor:'white',
    justifyContent:'center',alignItems:'center',
    flexDirection:'row'
  }
});
