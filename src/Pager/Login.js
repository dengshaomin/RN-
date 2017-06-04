/* @flow */

import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  Animated,
  TouchableOpacity,
  Alert
} from 'react-native';

// 用户状态Store
import UserInfoStore from '../Store/UserInfoStore';


export default class Login extends PureComponent {

  static navigationOptions = {
    header:null,
    gesturesEnabled:false
  };

  constructor(props){
    super(props)

    this.state = {
      opacity:new Animated.Value(1),
      pos:0
    }

    this.imgData = ['http://sep9.cn/rnfn2v','http://sep9.cn/ejkcav','http://sep9.cn/5gk2qd']

    this.animateStart()
  }

  // 开启动画
  animateStart = () =>{

    Animated.timing(this.state.opacity,{
      toValue:0,
      duration:2500
    }).start(()=>{

      if (this.state.pos+1 < this.imgData.length) {
          this.setState({
              pos:this.state.pos + 1
            },()=>{
                  this.state.opacity.setValue(1)
                  this.animateStart()
            })
          }else {
            this.setState({
              pos:0
            },()=>{
              this.state.opacity.setValue(1)
              this.animateStart()
            })
          }

    })
  }

  // 登录按钮被按下
  _loginDown = () =>{
    alert('登录成功')
    UserInfoStore.userState = true
    // global.navigation.navigate('PersonalStack')
  }

  render() {
    console.log(this.state.pos,this.state.opacity._value);
    return (
      <View style={styles.container}>
        {/* header头部 */}
        <View style={styles.header}>
          <Text style={{marginLeft:10,fontSize:17}} onPress={()=>this.props.navigation.goBack()}>X</Text>
          <Text style={{flex:1,textAlign:'right',marginRight:10}}>注册</Text>
        </View>
        {/* 网易严选标题 */}
        <View style={{flexDirection:'row',justifyContent:'center',height:40}}>
          <Text style={{width:14,color:'black',textAlignVertical:'top'}}>网易</Text>
          <Text style={{color:'black',width:5,fontSize:5,height:30}}>YANXUAN</Text>
          <Text style={{marginLeft:0,color:'black',fontSize:26,textAlignVertical:'top',fontWeight:'400'}}>严选</Text>
        </View>

        <Animated.View style={{justifyContent:'center',alignItems:'center',opacity:this.state.opacity,
        transform:[{
          scale:this.state.opacity.interpolate({
            inputRange: [0,1],
            outputRange: [1.1,1]
          })
        }]}}>
          <Image source={{uri:this.imgData[this.state.pos]}} style={{height:400,width:300}}/>
        </Animated.View>
        <TouchableOpacity style={{justifyContent:'center',alignItems:'center',marginLeft:10,marginRight:10,height:60,backgroundColor:'rgb(164,0,0)'}} onPress={this._loginDown}>
          <Text style={{color:'white'}}>邮箱账号/手机号登录</Text>
        </TouchableOpacity>
        <View style={{flex:1,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
          <Text style={{fontFamily:'iconfont',fontSize:25}}>&#xe60c;</Text>
          <Text>微信    |    </Text>
          <Text style={{fontFamily:'iconfont',fontSize:25}}>&#xe605;</Text>
          <Text>QQ    |    </Text>
          <Text style={{fontFamily:'iconfont',fontSize:25}}>&#xe603;</Text>
          <Text>微博</Text>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:Platform.OS == 'ios'?20:0
  },
  header:{
    flexDirection:'row'
  }
});
