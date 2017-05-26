/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  NativeModules,
  Alert
} from 'react-native';

import { QRScannerView } from 'ac-qrcode';

const CameraManager = NativeModules.CameraManager || NativeModules.CameraModule;

export default class QRScan extends Component {

  constructor(props){
    super(props)
    this.state ={
      flashState:false
    }
  }
  // 开启闪光灯
  _openFlash = () =>{
    CameraManager.openFlash()
  }

  // 关闭闪光灯
  _closeFlash = () =>{
    CameraManager.closeFlash()
  }

  // 切换闪光灯
  _toggerFlash = () =>{
    this.setState({
      flashState:!this.state.flashState
    })
  }

  _renderTitleBar(){
       return(
         <View style={styles.scanHeaderView}>
           <Text style={{flex:2,fontFamily:'iconfont',fontSize:30,}}>&#xe628;</Text>
           <Text style={{flex:10}}>二维码</Text>
           <Text style={{flex:2}}>相册</Text>
         </View>
       );
   }

   _renderMenu() {
       return (
         <View>
           { this.state.flashState?
             <Text style={styles.flashText} onPress={this._toggerFlash}>&#xe601;</Text>
             :
             <Text style={styles.flashText} onPress={this._toggerFlash}>&#xe95b;</Text>
           }
         </View>

       )
   }

   barcodeReceived(e) {
       alert('Type: ' + e.type + '\nData: ' + e.data);
   }

  render() {
    return (
      <QRScannerView
               onScanResultReceived={this.barcodeReceived.bind(this)}

               renderTopBarView={() => this._renderTitleBar()}

               renderBottomMenuView={() => this._renderMenu()}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scanHeaderView:{
    height:40,
    flexDirection:'row',
    backgroundColor:'red'
  },
  flashText:{
    width:50,height:50,
    borderRadius:25,
    backgroundColor:'rgba(0,0,0,0.2)',
    alignSelf:'center',
    textAlignVertical:'center',textAlign:'center',
    fontFamily:'iconfont',
    fontSize:30,
    color:'rgba(255,255,255,0.4)'
  }
});
