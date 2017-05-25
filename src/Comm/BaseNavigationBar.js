import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  View,
  Platform
} from 'react-native';
import NavigationBar from 'react-native-navbar';

//标题两侧样式
const TYPE = {
  _TEXT: 'text',//文字类型
  _IMG: 'img',//图片
  _VIEW: 'view',//自定义样式
};

//标题样式
const titleType = {
  _TEXT: 'text',//文字类型
  _VIEW: 'view',//自定义样式
  _DIY: 'custom',//定义的View
};

export default class BaseNavigationBar extends Component {
  /**
   * 标题： this.props.data.title
   * 左按钮： this.props.data.leftButton   text---文字  img---图片 view---自定义  type---类型  onClick---点击事件
   * 右按钮:  this.props.data.rightButton  text---文字 img---图片 view---自定义 type---类型  onClick---点击事件
   *
   */
  static defaultProps = {
    data: {
      titleViewStyle: '',
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      isSetLeft: false,
      isSetRight: false,
    }
  }

  componentDidMount() {
    //判断有没有传入(左按钮 右按钮 标题)
    if (this.state.data != null) {
      if (this.props.data.leftButton != null)
        this.setState({
          isSetLeft: true
        });
      else
        this.setState({
          isSetLeft: false,
        });
      if (this.props.data.rightButton != null)
        this.setState({
          isSetRight: true
        });
      else
        this.setState({
          isSetRight: false,
        });
    }
  }

  render() {
    //console.log('this.props.data.titleViewStyle:',this.props.data.titleViewStyle)
    return (
      <View>
        <NavigationBar
          statusBar={
            Platform.OS == 'ios' ? {
              tintColor: 'white',
              style: 'default' ,
              ...this.props.data.statusBar,
            } : {}
          }
          title={this.selectTitle()}
          //style={this.props.data.titleViewStyle == '' ? { backgroundColor: '#ff5454' } : this.props.data.titleViewStyle}
          style={[{ backgroundColor: '#ff5454' },this.props.data.titleViewStyle]}
          leftButton={
            <TouchableOpacity
            activeOpacity={1}
            style={{
              height: 44,
              width: 50,
              justifyContent: 'center',
              alignItems: 'center'
            }} onPress={() => {
              if ( this.state.isSetLeft && this.state.data.leftButton.onClick != null )
                this.props.data.leftButton.onClick();
            }}>
              {this.selectButton( this.state.data.leftButton )}
            </TouchableOpacity>
          }
          rightButton={
            <TouchableOpacity
            activeOpacity={1}
            style={{
              height: 44,
              width: 50,
              justifyContent: 'center',
              alignItems: 'center'
            }} onPress={() => {
              if ( this.state.isSetRight && this.state.data.rightButton.onClick != null )
                this.props.data.rightButton.onClick();
            }}>
              {this.selectButton( this.props.data.rightButton )}
            </TouchableOpacity>
          }
        />
      </View>
    );
  }

  //中间标题
  selectTitle() {
    if (this.state.data != null) {
      switch (this.props.data.titleType) {
        case 'view':
          return (<View style={{
            flex: 1,
            marginLeft: 48,
            marginRight: 48,
            justifyContent:'center',
            alignItems:'center'
          }}>
            {this.props.data.title}
          </View>);
        case 'text':
          return (<View style={{
            flex: 1,
            marginLeft: 48,
            marginRight: 48,
            justifyContent:'center',
            alignItems:'center',
          }}>
            <Text style={this.props.data.titleStyle}>
              {this.props.data.title}
            </Text>
          </View>);
        case 'custom':
          return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center',
            }}>
              {this.props.data.DIYTitleView}
            </View>
          );
        default:
          return ({
            title: (this.props.data.title == null ? "" : this.props.data.title),
            tintColor: '#f0f3f5',
            style: {fontSize: 18}
          });
      }
    }
  }

  selectButton(value) {
    if (value == null) {
      return null;
    } else {
      if (value.type == 'text') {
        return (
          <Text style={{
            color: '#ffff',
            fontSize: 16,paddingHorizontal:8
          }}>{(value.text == null ? "" : value.text)}</Text>
        );
      } else if (value.type == 'img') {
        return (
          <Image style={{ width: 18, height: 18, resizeMode: 'contain' }}
                 source={(value.img == null ? require('../images/ic_back.png') : value.img)}/>
        );
      } else if (value.type == 'view') {
        return (
          <View style={{width:40,height:48,alignItems:'center',justifyContent:'center'}}>
            {value.view}
          </View>
        )
      }
    }
  }
}
BaseNavigationBar.TYPE = TYPE;
BaseNavigationBar.titleType = titleType;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff5454',
  },
});
