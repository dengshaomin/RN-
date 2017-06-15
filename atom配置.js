hasOwnProperty
elevation
alignContent
React Navigation
DOCSBLOGDEMOGITHUB
Getting Started
Hello Mobile Navigation
Nesting Navigators
Configuring Headers
Navigators
Intro to Navigators
logoReact Native0.44
文档
入门课程hot
案例
博客
视频
讨论
热更新
关于

搜索文档
GitHub
ScrollView
在GitHub上修改这篇文档
支持我们
一个包装了平台的ScrollView（滚动视图）的组件，同时还集成了触摸锁定的“响应者”系统。

记住ScrollView必须有一个确定的高度才能正常工作，因为它实际上所做的就是将一系列不确定高度的子组件装进一个确定高度的容器（通过滚动操作）。要给一个ScrollView确定一个高度的话，要么直接给它设置高度（不建议），要么确定所有的父容器都已经绑定了高度。在视图栈的任意一个位置忘记使用{flex:1}都会导致错误，你可以使用元素查看器来查找问题的原因。

ScrollView内部的其他响应者尚无法阻止ScrollView本身成为响应者。

ScrollView和ListView/FlatList应该如何选择？ScrollView会简单粗暴地把所有子元素一次性全部渲染出来。其原理浅显易懂，使用上自然也最简单。然而这样简单的渲染逻辑自然带来了性能上的不足。想象一下你有一个特别长的列表需要显示，可能有好几屏的高度。创建和渲染那些屏幕以外的JS组件和原生视图，显然对于渲染性能和内存占用都是一种极大的拖累和浪费。

这就是为什么我们还有专门的ListView组件。ListView会惰性渲染子元素，只在它们将要出现在屏幕中时开始渲染。这种惰性渲染逻辑要复杂很多，因而API在使用上也更为繁琐。除非你要渲染的数据特别少，否则你都应该尽量使用ListView，哪怕它们用起来更麻烦。

FlatList是0.43版本开始新出的改进版的ListView，性能更优，但可能不够稳定，尚待时间考验。

属性
View props...

contentContainerStyle StyleSheetPropType(ViewStylePropTypes)

这些样式会应用到一个内层的内容容器上，所有的子视图都会包裹在内容容器内。例子：

return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
    </ScrollView>
  );
  ...
  var styles = StyleSheet.create({
    contentContainer: {
      paddingVertical: 20
    }
  });
horizontal bool

当此属性为true的时候，所有的子视图会在水平方向上排成一行，而不是默认的在垂直方向上排成一列。默认值为false。

keyboardDismissMode enum('none', "interactive", 'on-drag')

用户拖拽滚动视图的时候，是否要隐藏软键盘。

none（默认值），拖拽时不隐藏软键盘。

on-drag 当拖拽开始的时候隐藏软键盘。

interactive 软键盘伴随拖拽操作同步地消失，并且如果往上滑动会恢复键盘。安卓设备上不支持这个选项，会表现的和none一样。

keyboardShouldPersistTaps enum('always', 'never', 'handled', false, true)

如果当前界面有软键盘，那么点击scrollview后是否收起键盘，取决于本属性的设置。（译注：很多人反应TextInput无法自动失去焦点/需要点击多次切换到其他组件等等问题，其关键都是需要将TextInput放到ScrollView中再设置本属性）

'never'（默认值），点击TextInput以外的子组件会使当前的软键盘收起。此时子元素不会收到点击事件。
'always'，键盘不会自动收起，ScrollView也不会捕捉点击事件，但子组件可以捕获。
'handled'，当点击事件被子组件捕获时，键盘不会自动收起。这样切换TextInput时键盘可以保持状态。多数带有TextInput的情况下你应该选择此项。
false，已过期，请使用'never'代替。
true，已过期，请使用'always'代替。
onContentSizeChange function #

此函数会在ScrollView内部可滚动内容的视图发生变化时调用。

调用参数为内容视图的宽和高: (contentWidth, contentHeight)

此方法是通过绑定在内容容器上的onLayout来实现的。

onScroll function

在滚动的过程中，每帧最多调用一次此回调函数。调用的频率可以用scrollEventThrottle属性来控制。

refreshControl element

指定RefreshControl组件，用于为ScrollView提供下拉刷新功能。

removeClippedSubviews bool

（实验特性）：当此属性为true时，屏幕之外的子视图（子视图的overflow样式需要设为hidden）会被移除。这个可以提升大列表的滚动性能。默认值为true。

showsHorizontalScrollIndicator bool

当此属性为true的时候，显示一个水平方向的滚动条。

showsVerticalScrollIndicator bool

当此属性为true的时候，显示一个垂直方向的滚动条。

style style

Flexbox...

ShadowProp#style...

Transforms...

backfaceVisibility enum('visible', 'hidden')

backgroundColor string

borderColor string

borderTopColor string

borderRightColor string

borderBottomColor string

borderLeftColor string

borderRadius number

borderTopLeftRadius number

borderTopRightRadius number

borderBottomLeftRadius number

borderBottomRightRadius number

borderStyle enum('solid', 'dotted', 'dashed')

borderWidth number

borderTopWidth number

borderRightWidth number

borderBottomWidth number

borderLeftWidth number

opacity number

overflow enum('visible', 'hidden')

shadowColor string

shadowOffset {width: number, height: number}

shadowOpacity number

shadowRadius number

androidendFillColor  color

有时候滚动视图会占据比实际内容更多的空间。这种情况下可以使用此属性，指定以某种颜色来填充多余的空间，以避免设置背景和创建不必要的绘制开销。一般情况下并不需要这种高级优化技巧。

androidoverScrollMode enum('auto', 'always', 'never')

覆盖默认的overScroll模式

可选的值有：

'auto' - 默认值，允许用户在内容超出视图高度之后可以滚动视图。
'always' - 无论内容尺寸，用户始终可以滚动视图。
'never' - 始终不允许用户滚动视图。
androidscrollPerfTag  string

Tag used to log scroll performance on this scroll view. Will force momentum events to be turned on (see sendMomentumEvents). This doesn't do anything out of the box and you need to implement a custom native FpsListener for it to be useful.

iosalwaysBounceHorizontal bool

当此属性为true时，水平方向即使内容比滚动视图本身还要小，也可以弹性地拉动一截。当horizontal={true}时默认值为true，否则为false。

iosalwaysBounceVertical bool

当此属性为true时，垂直方向即使内容比滚动视图本身还要小，也可以弹性地拉动一截。当horizontal={true}时默认值为false，否则为true。

iosautomaticallyAdjustContentInsets bool

当滚动视图放在一个导航条或者工具条后面的时候，iOS系统是否要自动调整内容的范围。默认值为true。（译注：如果你的ScrollView或ListView的头部出现莫名其妙的空白，尝试将此属性置为false）

iosbounces bool

当值为true时，如果内容范围比滚动视图本身大，在到达内容末尾的时候，可以弹性地拉动一截。如果为false，尾部的所有弹性都会被禁用，即使alwaysBounce属性为true。默认值为true。

iosbouncesZoom bool

当值为true时，使用手势缩放内容可以超过min/max的限制，然后在手指抬起之后弹回min/max的缩放比例。否则的话，缩放不能超过限制。

ioscanCancelContentTouches bool

当值为false时，一旦有子节点响应触摸操作，即使手指开始移动也不会拖动滚动视图。默认值为true（在以上情况下可以拖动滚动视图。）

ioscenterContent bool

当值为true时，如果滚动视图的内容比视图本身小，则会自动把内容居中放置。当内容比滚动视图大的时候，此属性没有作用。默认值为false。

ioscontentInset {top: number, left: number, bottom: number, right: number}

内容范围相对滚动视图边缘的坐标。默认为{0, 0, 0, 0}。

ioscontentOffset PointPropType

用来手动设置初始的滚动坐标。默认值为{x: 0, y: 0}。

iosdecelerationRate number

一个浮点数，用于决定当用户抬起手指之后，滚动视图减速停下的速度。常见的选项有：

Normal: 0.998 (默认值)

Fast: 0.9

iosdirectionalLockEnabled bool

当值为真时，滚动视图在拖拽的时候会锁定只有垂直或水平方向可以滚动。默认值为false。

iosindicatorStyle enum('default', 'black', 'white')

设置滚动条的样式。

default，默认值，等同black.
black，黑色滚动条。
white，白色滚动条。
iosmaximumZoomScale number

允许的最大缩放比例。默认值为1.0。

iosminimumZoomScale number

允许的最小缩放比例。默认值为1.0。

iosonRefreshStart function

已过期
请使用refreshControl 属性代替。

iosonScrollAnimationEnd function

当滚动动画结束之后调用此回调。

pagingEnabled bool

当值为true时，滚动条会停在滚动视图的尺寸的整数倍位置。这个可以用在水平分页上。默认值为false。

scrollEnabled bool

当值为false的时候，内容不能滚动，默认值为true。

iosscrollEventThrottle number

这个属性控制在滚动过程中，scroll事件被调用的频率（单位是每秒事件数量）。更大的数值能够更及时的跟踪滚动位置，不过可能会带来性能问题，因为更多的信息会通过bridge传递。默认值为0，意味着每次视图被滚动，scroll事件只会被调用一次。

iosscrollIndicatorInsets {top: number, left: number, bottom: number, right: number}

决定滚动条距离视图边缘的坐标。这个值应该和contentInset一样。默认值为{0, 0, 0, 0}。

iosscrollsToTop bool

当此值为true时，点击状态栏的时候视图会滚动到顶部。默认值为true。

iossnapToAlignment enum('start', "center", 'end')

当设置了snapToInterval，snapToAlignment会定义停驻点与滚动视图之间的关系。

start (默认) 会将停驻点对齐在左侧（水平）或顶部（垂直）

center 会将停驻点对齐到中间

end 会将停驻点对齐到右侧（水平）或底部（垂直）

iossnapToInterval number

当设置了此属性时，会让滚动视图滚动停止后，停止在snapToInterval的倍数的位置。这可以在一些子视图比滚动视图本身小的时候用于实现分页显示。与snapToAlignment组合使用。

stickyHeaderIndices [number]

一个子视图下标的数组，用于决定哪些成员会在滚动之后固定在屏幕顶端。举个例子，传递stickyHeaderIndices={[0]}会让第一个成员固定在滚动视图顶端。这个属性不能和horizontal={true}一起使用。

ioszoomScale number

滚动视图内容初始的缩放比例。默认值为1.0。

方法
scrollTo(y: number | { x?: number, y?: number, animated?: boolean }, x: number, animated: boolean)

滚动到指定的x, y偏移处。第三个参数为是否启用平滑滚动动画。

使用示例:

scrollTo({x: 0, y: 0, animated: true})

scrollToEnd(options?)

滚动到视图底部（水平方向的视图则滚动到最右边）。

加上动画参数 scrollToEnd({animated: true})则启用平滑滚动动画，或是调用 scrollToEnd({animated: false})来立即跳转。如果不使用参数，则animated选项默认启用。

例子
'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} = ReactNative;

exports.displayName = (undefined: ?string);
exports.title = '<ScrollView>';
exports.description = 'Component that enables scrolling through child components';
exports.examples = [
{
  title: '<ScrollView>',
  description: 'To make content scrollable, wrap it within a <ScrollView> component',
  render: function() {
    var _scrollView: ScrollView;
    return (
      <View>
        <ScrollView
          ref={(scrollView) => { _scrollView = scrollView; }}
          automaticallyAdjustContentInsets={false}
          onScroll={() => { console.log('onScroll!'); }}
          scrollEventThrottle={200}
          style={styles.scrollView}>
          {THUMBS.map(createThumbRow)}
        </ScrollView>
        <TouchableOpacity
          style={styles.button}
          onPress={() => { _scrollView.scrollTo({y: 0}); }}>
          <Text>Scroll to top</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => { _scrollView.scrollToEnd({animated: true}); }}>
          <Text>Scroll to bottom</Text>
        </TouchableOpacity>
      </View>
    );
  }
}, {
  title: '<ScrollView> (horizontal = true)',
  description: 'You can display <ScrollView>\'s child components horizontally rather than vertically',
  render: function() {
    var _scrollView: ScrollView;
    return (
      <View>
        <ScrollView
          ref={(scrollView) => { _scrollView = scrollView; }}
          automaticallyAdjustContentInsets={false}
          horizontal={true}
          style={[styles.scrollView, styles.horizontalScrollView]}>
          {THUMBS.map(createThumbRow)}
        </ScrollView>
        <TouchableOpacity
          style={styles.button}
          onPress={() => { _scrollView.scrollTo({x: 0}); }}>
          <Text>Scroll to start</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => { _scrollView.scrollToEnd({animated: true}); }}>
          <Text>Scroll to end</Text>
        </TouchableOpacity>
      </View>
    );
  }
}];

class Thumb extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() {
    return (
      <View style={styles.button}>
        <Image style={styles.img} source={{uri:this.props.uri}} />
      </View>
    );
  }
}

var THUMBS = ['https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-ash3/t39.1997/p128x128/851549_767334479959628_274486868_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851561_767334496626293_1958532586_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-ash3/t39.1997/p128x128/851579_767334503292959_179092627_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851589_767334513292958_1747022277_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851563_767334559959620_1193692107_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851593_767334566626286_1953955109_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851591_767334523292957_797560749_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851567_767334529959623_843148472_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851548_767334489959627_794462220_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851575_767334539959622_441598241_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-ash3/t39.1997/p128x128/851573_767334549959621_534583464_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851583_767334573292952_1519550680_n.png'];
THUMBS = THUMBS.concat(THUMBS); // double length of THUMBS
var createThumbRow = (uri, i) => <Thumb key={i} uri={uri} />;

var styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#6A85B1',
    height: 300,
  },
  horizontalScrollView: {
    height: 120,
  },
  containerPage: {
    height: 50,
    width: 50,
    backgroundColor: '#527FE4',
    padding: 5,
  },
  text: {
    fontSize: 20,
    color: '#888888',
    left: 80,
    top: 20,
    height: 40,
  },
  button: {
    margin: 7,
    padding: 5,
    alignItems: 'center',
    backgroundColor: '#eaeaea',
    borderRadius: 3,
  },
  buttonContents: {
    flexDirection: 'row',
    width: 64,
    height: 64,
  },
  img: {
    width: 64,
    height: 64,
  }
});
前一篇：RefreshControl后一篇：SectionList
听晴明老师从头讲React Native
入门基础
搭建开发环境
编写Hello World
Props（属性）
State（状态）
样式
高度与宽度
使用Flexbox布局
处理文本输入
如何使用ScrollView
如何使用ListView
网络
其他参考资源
进阶指南
嵌入到现有原生应用
颜色
图片
处理触摸事件
动画
无障碍功能
定时器
直接操作
调试
自动化测试
JavaScript环境
导航器对比
性能
升级
特定平台代码
手势响应系统
社区资源
中文视频教程
js.coach第三方组件库
中文论坛组件分享区
中文论坛问题求助区
使用指南(iOS)
原生模块
原生UI组件
链接原生库
在设备上运行
在模拟器上运行
在原生和React Native间通信
使用指南(Android)
原生模块
原生UI组件
Headless JS（后台任务）
在设备上运行
打包APK
调试Android UI性能
从源代码编译React Native
组件
ActivityIndicator
Button
DatePickerIOS
DrawerLayoutAndroid
FlatList
Image
KeyboardAvoidingView
ListView
ListView.DataSource
Modal
NavigatorIOS
Picker
PickerIOS
ProgressBarAndroid
ProgressViewIOS
RefreshControl
ScrollView
SectionList
SegmentedControlIOS
Slider
StatusBar
Switch
TabBarIOS
TabBarIOS.Item
Text
TextInput
ToolbarAndroid
TouchableHighlight
TouchableNativeFeedback
TouchableOpacity
TouchableWithoutFeedback
View
ViewPagerAndroid
VirtualizedList
WebView
API
ActionSheetIOS
AdSupportIOS
Alert
AlertIOS
Animated
AppRegistry
AppState
AsyncStorage
BackAndroid
BackHandler
CameraRoll
Clipboard
DatePickerAndroid
Dimensions
Easing
Geolocation
ImageEditor
ImagePickerIOS
ImageStore
InteractionManager
Keyboard
LayoutAnimation
Linking
NativeMethodsMixin
NetInfo
PanResponder
PermissionsAndroid
PixelRatio
PushNotificationIOS
Share
StyleSheet
Systrace
TimePickerAndroid
ToastAndroid
Vibration
布局样式属性
阴影样式属性
React Native中文网.

© 2017 杭州欧石南网络科技有限公司

浙ICP备15023664号-3

浙公网安备 33010602005511号浙公网安备 33010602005511号
StackNavigator
TabNavigator
DrawerNavigator
The Navigation Prop
Navigation Actions
Screen Nav Options
Custom Navigators
Advanced Guides
Redux Integration
Web Integration
Deep Linking
Screen Tracking
Contributors
Routers
Routers
Custom Router API
StackRouter
TabRouter
Views
Navigation Views
Transitioner
StackNavigator
Provides a way for your app to transition between screens where each new screen is placed on top of a stack.
By default the StackNavigator is configured to have the familiar iOS and Android look & feel: new screens slide in from the right on iOS, fade in from the bottom on Android. On iOS the StackNavigator can also be configured to a modal style where screens slide in from the bottom.

class MyHomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  }

  render() {
    return (
      <Button
        onPress={() => this.props.navigation.navigate('Profile', {name: 'Lucy'})}
        title="Go to Lucy's profile"
      />
    );
  }
}

const ModalStack = StackNavigator({
  Home: {
    screen: MyHomeScreen,
  },
  Profile: {
    path: 'people/:name',
    screen: MyProfileScreen,
  },
});
API Definition
StackNavigator(RouteConfigs, StackNavigatorConfig)
RouteConfigs
The route configs object is a mapping from route name to a route config, which tells the navigator what to present for that route.
StackNavigator({

  // For each screen that you can navigate to, create a new entry like this:
  Profile: {

    // `ProfileScreen` is a React component that will be the main content of the screen.
    screen: ProfileScreen,
    // When `ProfileScreen` is loaded by the StackNavigator, it will be given a `navigation` prop.

    // Optional: When deep linking or using react-navigation in a web app, this path is used:
    path: 'people/:name',
    // The action and route params are extracted from the path.

    // Optional: Override the `navigationOptions` for the screen
    navigationOptions: ({navigation}) => ({
      title: `${navigation.state.params.name}'s Profile'`,
    }),
  },

  ...MyOtherRoutes,
});
StackNavigatorConfig
Options for the router:
initialRouteName - Sets the default screen of the stack. Must match one of the keys in route configs.
initialRouteParams - The params for the initial route
navigationOptions - Default navigation options to use for screens
paths - A mapping of overrides for the paths set in the route configs
Visual options:
mode - Defines the style for rendering and transitions:
card - Use the standard iOS and Android screen transitions. This is the default.
modal - Make the screens slide in from the bottom which is a common iOS pattern. Only works on iOS, has no effect on Android.
headerMode - Specifies how the header should be rendered:
float - Render a single header that stays at the top and animates as screens are changed. This is a common pattern on iOS.
screen - Each screen has a header attached to it and the header fades in and out together with the screen. This is a common pattern on Android.
none - No header will be rendered.
cardStyle - Use this prop to override or extend the default style for an individual card in stack.
transitionConfig - Function to return an object that overrides default screen transitions.
onTransitionStart - Function to be invoked when the card transition animation is about to start.
onTransitionEnd - Function to be invoked once the card transition animation completes.
Screen Navigation Options
title
String that can be used as a fallback for headerTitle and tabBarLabel
header
React Element or a function that given HeaderProps returns a React Element, to display as a header. Setting to null hides header.
headerTitle
String or React Element used by the header. Defaults to scene title
headerBackTitle
Title string used by the back button on iOS or null to disable label. Defaults to scene title
headerTruncatedBackTitle
Title string used by the back button when headerBackTitle doesn't fit on the screen. "Back" by default.
headerRight
React Element to display on the right side of the header
headerLeft
React Element to display on the left side of the header
headerStyle
Style object for the header
headerTitleStyle
Style object for the title component
headerBackTitleStyle
Style object for the back title
headerTintColor
Tint color for the header
headerPressColorAndroid
Color for material ripple (Android >= 5.0 only)
gesturesEnabled
Whether you can use gestures to dismiss this screen. Defaults to true on iOS, false on Android.
Navigator Props
The navigator component created by StackNavigator(...) takes the following props:
screenProps - Pass down extra options to child screens, for example:
const SomeStack = StackNavigator({
  // config
});

<SomeStack
  screenProps={/* this prop will get passed to the screen components as this.props.screenProps */}
/>
Examples
See the examples SimpleStack.js and ModalStack.js which you can run locally as part of the NavigationPlayground app.
You can view these examples directly on your phone by visiting our expo demo.
Edit on GitHubPrevious: Intro to NavigatorsNext: TabNavigator
React Navigation·Distributed under BSD License
navigator.getCurrentRoutes();
logoReact Native0.43
文档
入门课程hot
案例
博客
视频
讨论
热更新
关于

搜索文档
GitHub
FlatList
在GitHub上修改这篇文档
支持我们
高性能的简单列表组件，支持下面这些常用的功能：

完全跨平台。
支持水平布局模式。
行组件显示或隐藏时可配置回调事件。
支持单独的头部组件。
支持单独的尾部组件。
支持自定义行间分隔线。
支持下拉刷新。
支持上拉加载。
如果需要分组/类/区（section），请使用<SectionList>.


React Navigation
DOCSBLOGDEMOGITHUB
Getting Started
Hello Mobile Navigation
Nesting Navigators
Configuring Headers
Navigators
Intro to Navigators
StackNavigator
TabNavigator
DrawerNavigator
The Navigation Prop
Navigation Actions
Screen Nav Options
Custom Navigators
Advanced Guides
Redux Integration
Web Integration
Deep Linking
Screen Tracking
Contributors
Routers
Routers
Custom Router API
StackRouter
TabRouter
Views
Navigation Views
Transitioner
TabNavigator
Used to easily set up a screen with several tabs with a TabRouter. For a live example please see our expo demo.
class MyHomeScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Home',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('./chats-icon.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };

  render() {
    return (
      <Button
        onPress={() => this.props.navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    );
  }
}

class MyNotificationsScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Notifications',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('./notif-icon.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };

  render() {
    return (
      <Button
        onPress={() => this.props.navigation.goBack()}
        title="Go back home"
      />
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
  },
});

const MyApp = TabNavigator({
  Home: {
    screen: MyHomeScreen,
  },
  Notifications: {
    screen: MyNotificationsScreen,
  },
}, {
  tabBarOptions: {
    activeTintColor: '#e91e63',
  },
});
API Definition
TabNavigator(RouteConfigs, TabNavigatorConfig)
RouteConfigs
The route configs object is a mapping from route name to a route config, which tells the navigator what to present for that route, see example from StackNavigator.
TabNavigatorConfig
tabBarComponent - component to use as the tab bar, e.g. TabBarBottom (this is the default on iOS), TabBarTop (this is the default on Android)
tabBarPosition - position of the tab bar, can be 'top' or 'bottom'
swipeEnabled - whether to allow swiping between tabs
animationEnabled - whether to animate when changing tabs
lazy - whether to lazily render tabs as needed as opposed to rendering them upfront
tabBarOptions - configure the tab bar, see below.
Several options get passed to the underlying router to modify navigation logic:
initialRouteName - The routeName for the initial tab route when first loading
order - Array of routeNames which defines the order of the tabs
paths - Provide a mapping of routeName to path config, which overrides the paths set in the routeConfigs.
backBehavior - Should the back button cause a tab switch to the initial tab? If yes, set to initialRoute, otherwise none. Defaults to initialRoute behavior.
tabBarOptions for TabBarBottom (default tab bar on iOS)
activeTintColor - label and icon color of the active tab
activeBackgroundColor - background color of the active tab
inactiveTintColor - label and icon color of the inactive tab
inactiveBackgroundColor - background color of the inactive tab
showLabel - whether to show label for tab, default is true
style - style object for the tab bar
labelStyle - style object for the tab label
Example:
tabBarOptions: {
  activeTintColor: '#e91e63',
  labelStyle: {
    fontSize: 12,
  },
  style: {
    backgroundColor: 'blue',
  },
}
tabBarOptions for TabBarTop (default tab bar on Android)
activeTintColor - label and icon color of the active tab
inactiveTintColor - label and icon color of the inactive tab
showIcon - whether to show icon for tab, default is false
showLabel - whether to show label for tab, default is true
upperCaseLabel - whether to make label uppercase, default is true
pressColor - color for material ripple (Android >= 5.0 only)
pressOpacity - opacity for pressed tab (iOS and Android < 5.0 only)
scrollEnabled - whether to enable scrollable tabs
tabStyle - style object for the tab
indicatorStyle - style object for the tab indicator (line at the bottom of the tab)
labelStyle - style object for the tab label
iconStyle - style object for the tab icon
style - style object for the tab bar
Example:
tabBarOptions: {
  labelStyle: {
    fontSize: 12,
  },
  style: {
    backgroundColor: 'blue',
  },
}
Screen Navigation Options
title
Generic title that can be used as a fallback for headerTitle and tabBarLabel
tabBarVisible
True or false to show or hide the tab bar, if not set then defaults to true
tabBarIcon
React Element or a function that given { focused: boolean, tintColor: string } returns a React.Element, to display in tab bar
tabBarLabel
Title string of a tab displayed in the tab bar or React Element or a function that given { focused: boolean, tintColor: string } returns a React.Element, to display in tab bar. When undefined, scene title is used. To hide, see tabBarOptions.showLabel in the previous section.
Navigator Props
The navigator component created by TabNavigator(...) takes the following props:
screenProps - Pass down extra options to child screens and navigation options, for example:
const TabNav = TabNavigator({
  // config
});

<TabNav
  screenProps={/* this prop will get passed to the screen components as this.props.screenProps */}
/>
Edit on GitHubPrevious: StackNavigatorNext: DrawerNavigator
React Navigation·Distributed under BSD License
一个简单的例子：

<FlatList
  data={[{key: 'a'}, {key: 'b'}]}
  renderItem={({item}) => <Text>{item.key}</Text>}
/>
本组件实质是基于<VirtualizedList>组件的封装，因此也有下面这些需要注意的事项：

当某行滑出渲染区域之外后，其内部状态将不会保留。请确保你在行组件以外的地方保留了数据。
本组件继承自PureComponent而非通常的Component，这意味着如果其props在浅比较中是相等的，则不会重新渲染。所以请先检查你的renderItem函数所依赖的props数据（包括data属性以及可能用到的父组件的state），如果是一个引用类型（Object或者数组都是引用类型），则需要先修改其引用地址（比如先复制到一个新的Object或者数组中），然后再修改其值，否则界面很可能不会刷新。（译注：这一段不了解的朋友建议先学习下js中的基本类型和引用类型。）
为了优化内存占用同时保持滑动的流畅，列表内容会在屏幕外异步绘制。这意味着如果用户滑动的速度超过渲染的速度，则会先看到空白的内容。这是为了优化不得不作出的妥协，而我们也在设法持续改进。
默认情况下每行都需要提供一个不重复的key属性。你也可以提供一个keyExtractor函数来生成key。
属性
ItemSeparatorComponent?: ?ReactClass<any>

行与行之间的分隔线组件。不会出现在第一行之前和最后一行之后。

ListFooterComponent?: ?ReactClass<any>

尾部组件

ListHeaderComponent?: ?ReactClass<any>

头部组件

columnWrapperStyle?: StyleObj

如果设置了多列布局（即将numColumns值设为大于1的整数），则可以额外指定此样式作用在每行容器上。

data: ?Array<ItemT>

为了简化起见，data属性目前只支持普通数组。如果需要使用其他特殊数据结构，例如immutable数组，请直接使用更底层的VirtualizedList组件。

getItem?:

getItemCount?:

getItemLayout?: (data: ?Array<ItemT>, index: number) =>
  {length: number, offset: number, index: number}

getItemLayout是一个可选的优化，用于避免动态测量内容尺寸的开销，不过前提是你可以提前知道内容的高度。如果你的行高是固定的，getItemLayout用起来就既高效又简单，类似下面这样：

getItemLayout={(data, index) => ( {length: 行高, offset: 行高 * index, index} )}
注意如果你指定了SeparatorComponent，请把分隔线的尺寸也考虑到offset的计算之中。

horizontal?: ?boolean

设置为true则变为水平布局模式。

keyExtractor: (item: ItemT, index: number) => string

此函数用于为给定的item生成一个不重复的key。Key的作用是使React能够区分同类元素的不同个体，以便在刷新时能够确定其变化的位置，减少重新渲染的开销。若不指定此函数，则默认抽取item.key作为key值。若item.key也不存在，则使用数组下标。

legacyImplementation?:  ?boolean


设置为true则使用旧的ListView的实现。

numColumns: number

多列布局只能在非水平模式下使用。此时组件内元素会从左到右从上到下按Z字形排列，类似启用了flexWrap的布局。组件内元素必须是等高的——暂时还无法支持瀑布流布局。

onEndReached?: ?(info: {distanceFromEnd: number}) => void

当所有的数据都已经渲染过，并且列表被滚动到距离最底部不足onEndReachedThreshold个像素的距离时调用。

onEndReachedThreshold?:  ?number

onRefresh?: ?() => void

如果设置了此选项，则会在列表头部添加一个标准的RefreshControl控件，以便实现“下拉刷新”的功能。同时你需要正确设置refreshing属性。

onViewableItemsChanged?:  ?(info: {viewableItems: Array<ViewToken>, changed: Array<ViewToken>}) => void

Called when the viewability of rows changes, as defined by the viewablePercentThreshold prop.

refreshing?: ?boolean

Set this true while waiting for new data from a refresh.

renderItem: (info: {item: ItemT, index: number}) => ?React.Element<any>

根据行数据data渲染每一行的组件。典型用法：

_renderItem = ({item}) => ( <TouchableOpacity onPress={() => this._onPress(item)}> <Text>{item.title}}</Text> </TouchableOpacity> ); ... <FlatList data={[{title: 'Title Text', key: 'item1'}]} renderItem={this._renderItem} />
除data外还有第二个参数index可供使用。

viewabilityConfig?: ViewabilityConfig

请参考ViewabilityHelper的源码来了解具体的配置类型。

方法
scrollToEnd(params?: object)

滚动到底部。如果不设置getItemLayout属性的话，可能会比较卡。

scrollToIndex(params: object)

Scrolls to the item at a the specified index such that it is positioned in the viewable area such that viewPosition 0 places it at the top, 1 at the bottom, and 0.5 centered in the middle.

May be janky without getItemLayout prop.

scrollToItem(params: object)

Requires linear scan through data - use scrollToIndex instead if possible. May be janky without getItemLayout prop.

scrollToOffset(params: object)

Scroll to a specific content pixel offset, like a normal ScrollView.

recordInteraction()

Tells the list an interaction has occured, which should trigger viewability calculations, e.g. if waitForInteractions is true and the user has not scrolled. This is typically called by taps on items or by navigation actions.

例子
'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
  Animated,
  FlatList,
  StyleSheet,
  View,
} = ReactNative;

const UIExplorerPage = require('./UIExplorerPage');

const infoLog = require('infoLog');

const {
  FooterComponent,
  HeaderComponent,
  ItemComponent,
  PlainInput,
  SeparatorComponent,
  genItemData,
  getItemLayout,
  pressItem,
  renderSmallSwitchOption,
} = require('./ListExampleShared');

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const VIEWABILITY_CONFIG = {
  minimumViewTime: 3000,
  viewAreaCoveragePercentThreshold: 100,
  waitForInteraction: true,
};

class FlatListExample extends React.PureComponent {
  static title = '<FlatList>';
  static description = 'Performant, scrollable list of data.';

  state = {
    data: genItemData(1000),
    debug: false,
    horizontal: false,
    filterText: '',
    fixedHeight: true,
    logViewable: false,
    virtualized: true,
  };

  _onChangeFilterText = (filterText) => {
    this.setState({filterText});
  };

  _onChangeScrollToIndex = (text) => {
    this._listRef.getNode().scrollToIndex({viewPosition: 0.5, index: Number(text)});
  };

  _scrollPos = new Animated.Value(0);
  _scrollSinkX = Animated.event(
    [{nativeEvent: { contentOffset: { x: this._scrollPos } }}],
    {useNativeDriver: true},
  );
  _scrollSinkY = Animated.event(
    [{nativeEvent: { contentOffset: { y: this._scrollPos } }}],
    {useNativeDriver: true},
  );

  componentDidUpdate() {
    this._listRef.getNode().recordInteraction(); // e.g. flipping logViewable switch
  }

  render() {
    const filterRegex = new RegExp(String(this.state.filterText), 'i');
    const filter = (item) => (
      filterRegex.test(item.text) || filterRegex.test(item.title)
    );
    const filteredData = this.state.data.filter(filter);
    return (
      <UIExplorerPage
        noSpacer={true}
        noScroll={true}>
        <View style={styles.searchRow}>
          <View style={styles.options}>
            <PlainInput
              onChangeText={this._onChangeFilterText}
              placeholder="Search..."
              value={this.state.filterText}
            />
            <PlainInput
              onChangeText={this._onChangeScrollToIndex}
              placeholder="scrollToIndex..."
            />
          </View>
          <View style={styles.options}>
            {renderSmallSwitchOption(this, 'virtualized')}
            {renderSmallSwitchOption(this, 'horizontal')}
            {renderSmallSwitchOption(this, 'fixedHeight')}
            {renderSmallSwitchOption(this, 'logViewable')}
            {renderSmallSwitchOption(this, 'debug')}
            <Animated.View style={[styles.spindicator, {
              transform: [
                {rotate: this._scrollPos.interpolate({
                  inputRange: [0, 5000],
                  outputRange: ['0deg', '360deg'],
                  extrapolate: 'extend',
                })}
              ]
            }]} />
          </View>
        </View>
        <SeparatorComponent />
        <AnimatedFlatList
          ItemSeparatorComponent={SeparatorComponent}
          ListHeaderComponent={HeaderComponent}
          ListFooterComponent={FooterComponent}
          data={filteredData}
          debug={this.state.debug}
          disableVirtualization={!this.state.virtualized}
          getItemLayout={this.state.fixedHeight ?
            this._getItemLayout :
            undefined
          }
          horizontal={this.state.horizontal}
          key={(this.state.horizontal ? 'h' : 'v') +
            (this.state.fixedHeight ? 'f' : 'd')
          }
          legacyImplementation={false}
          numColumns={1}
          onRefresh={this._onRefresh}
          onScroll={this.state.horizontal ? this._scrollSinkX : this._scrollSinkY}
          onViewableItemsChanged={this._onViewableItemsChanged}
          ref={this._captureRef}
          refreshing={false}
          renderItem={this._renderItemComponent}
          shouldItemUpdate={this._shouldItemUpdate}
          viewabilityConfig={VIEWABILITY_CONFIG}
        />
      </UIExplorerPage>
    );
  }
  _captureRef = (ref) => { this._listRef = ref; };
  _getItemLayout = (data: any, index: number) => {
    return getItemLayout(data, index, this.state.horizontal);
  };
  _onRefresh = () => alert('onRefresh: nothing to refresh :P');
  _renderItemComponent = ({item}) => {
    return (
      <ItemComponent
        item={item}
        horizontal={this.state.horizontal}
        fixedHeight={this.state.fixedHeight}
        onPress={this._pressItem}
      />
    );
  };
  _shouldItemUpdate(prev, next) {
    /**
     * Note that this does not check state.horizontal or state.fixedheight
     * because we blow away the whole list by changing the key in those cases.
     * Make sure that you do the same in your code, or incorporate all relevant
     * data into the item data, or skip this optimization entirely.
     */
    return prev.item !== next.item;
  }
  // This is called when items change viewability by scrolling into or out of
  // the viewable area.
  _onViewableItemsChanged = (info: {
      changed: Array<{
        key: string,
        isViewable: boolean,
        item: any,
        index: ?number,
        section?: any,
      }>
    }
  ) => {
    // Impressions can be logged here
    if (this.state.logViewable) {
      infoLog(
        'onViewableItemsChanged: ',
        info.changed.map((v) => ({...v, item: '...'})),
      );
    }
  };
  _pressItem = (key: number) => {
    this._listRef.getNode().recordInteraction();
    pressItem(this, key);
  };
  _listRef: FlatList<*>;
}


const styles = StyleSheet.create({
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  searchRow: {
    paddingHorizontal: 10,
  },
  spindicator: {
    marginLeft: 'auto',
    width: 2,
    height: 16,
    backgroundColor: 'darkgray',
  },
});

module.exports = FlatListExample;
前一篇：DrawerLayoutAndroid后一篇：Image
听晴明老师从头讲React Native
被顶起来的评论
Robin
Robin
onReachEnd 只会调用一次啊，而且调用的时机不对

4月7日回复顶(2)转发举报
最新最早最热
5条评论
小譁
小譁
FlatList和VirtualizedList
無限列表依然存在內存沒有釋放的問題.....

4月6日回复顶转发举报
Robin
Robin
onReachEnd 只会调用一次啊，而且调用的时机不对

4月7日回复顶(2)转发举报
david
david
回复 Robin: 我也遇到这个问题 请问怎么解决额

4月9日回复顶转发举报
david
david
回复 Robin: onReachEnd 只会调用一次 这个问题怎么解决？

4月9日回复顶转发举报
孙鳌
孙鳌
onReachEnd 确实调用时间不对，从第二次触发开始就不再是到底部才加载了

4月13日回复顶转发举报
社交帐号登录:

微信
微博
QQ
人人
更多»
豆瓣
开心
百度
谷歌


说点什么吧…
发布
ReactNative中文网正在使用多说

入门基础
搭建开发环境
编写Hello World
Props（属性）
State（状态）
样式
高度与宽度
使用Flexbox布局
处理文本输入
如何使用ScrollView
如何使用ListView
网络
其他参考资源
进阶指南
嵌入到现有原生应用
颜色
图片
处理触摸事件
动画
无障碍功能
定时器
直接操作
调试
自动化测试
JavaScript环境
导航器对比
性能
升级
特定平台代码
手势响应系统
社区资源
中文视频教程
js.coach第三方组件库
中文论坛组件分享区
中文论坛问题求助区
使用指南(iOS)
原生模块
原生UI组件
链接原生库
在设备上运行
在模拟器上运行
在原生和React Native间通信
使用指南(Android)
原生模块
原生UI组件
Headless JS（后台任务）
在设备上运行
打包APK
调试Android UI性能
从源代码编译React Native
组件
ActivityIndicator
Button
DatePickerIOS
DrawerLayoutAndroid
FlatList
Image
KeyboardAvoidingView
ListView
ListView.DataSource
Modal
Navigator
NavigatorIOS
Picker
PickerIOS
ProgressBarAndroid
ProgressViewIOS
RefreshControl
ScrollView
SectionList
SegmentedControlIOS
Slider
StatusBar
Switch
TabBarIOS
TabBarIOS.Item
Text
TextInput
ToolbarAndroid
TouchableHighlight
TouchableNativeFeedback
TouchableOpacity
TouchableWithoutFeedback
View
ViewPagerAndroid
VirtualizedList
WebView
API
ActionSheetIOS
AdSupportIOS
Alert
AlertIOS
Animated
AppRegistry
AppState
AsyncStorage
BackAndroid
CameraRoll
Clipboard
DatePickerAndroid
Dimensions
Easing
Geolocation
ImageEditor
ImagePickerIOS
ImageStore
InteractionManager
Keyboard
LayoutAnimation
Linking
NativeMethodsMixin
NetInfo
PanResponder
PermissionsAndroid
PixelRatio
PushNotificationIOS
Share
StyleSheet
Systrace
TimePickerAndroid
ToastAndroid
Vibration
布局样式属性
阴影样式属性
React Native中文网.

© 2017 杭州欧石南网络科技有限公司

浙ICP备15023664号-3

浙公网安备 33010602005511号浙公网安备 33010602005511号
observable
computed
useStrict
autorun
observer
action
Dimensions,
measure,
chilren,
forceUpdate,
AndroidPermissions
StackNavigator
ActivityIndicatorIOS - ReactActivityIndicator
ActivityIndicator - ReactActivityIndicator
DatePickerIOS - ReactDatePicker TODO
DrawerLayoutAndroid - ReactDrawerLayout
Image - ReactImage
ListView - ReactListView
Modal - ReactModal
Navigator - ReactNavigator
PickerIOS ReactPicker
ProgressViewIOS - ReactProgressView
ScrollView - ReactScrollView
SegmentedControlIOS - ReactSegmentedControl
SliderIOS - ReactSlider
Switch - ReactSwitch
SwitchAndroid - ReactSwitch
SwitchIOS - ReactSwitch
RefreshControl - ReactRefreshControl
TabBarIOS - ReactTabBar
Text - ReactText
TextInput - ReactTextInput
ToastAndroid - ReactToast
Touchable - ReactTouchable
TouchableHighlight - ReactTouchableHighlight
TouchableOpacity - ReactTouchableOpacity
TouchableWithoutFeedback - ReactTouchableWithoutFeedback
View - ReactView
ViewPagerAndroid - ReactViewPager

Alert - ReactAlert
AlertIOS - ReactAlert
Animated - ReactAnimated
AppRegistry - ReactAppRegistry
AsyncStorage - ReactAsyncStorage
Dimensions - ReactDimensions
Easing - ReactEasing
InteractionManager - ReactInteractionManager
LayoutAnimation - ReactLayoutAnimation
PanResponder - ReactPanResponder
PixelRatio - ReactPixelRatio
StyleSheet - ReactStyleSheet

NativeModules - ReactNativeModules
Platform - ReactPlatform
processColor - ReactProcessColor

READ_CALENDAR: 'android.permission.READ_CALENDAR',
WRITE_CALENDAR: 'android.permission.WRITE_CALENDAR',
CAMERA: 'android.permission.CAMERA',
READ_CONTACTS: 'android.permission.READ_CONTACTS',
WRITE_CONTACTS: 'android.permission.WRITE_CONTACTS',
GET_ACCOUNTS:  'android.permission.GET_ACCOUNTS',
ACCESS_FINE_LOCATION: 'android.permission.ACCESS_FINE_LOCATION',
ACCESS_COARSE_LOCATION: 'android.permission.ACCESS_COARSE_LOCATION',
RECORD_AUDIO: 'android.permission.RECORD_AUDIO',
READ_PHONE_STATE: 'android.permission.READ_PHONE_STATE',
CALL_PHONE: 'android.permission.CALL_PHONE',
READ_CALL_LOG: 'android.permission.READ_CALL_LOG',
WRITE_CALL_LOG: 'android.permission.WRITE_CALL_LOG',
ADD_VOICEMAIL: 'com.android.voicemail.permission.ADD_VOICEMAIL',
USE_SIP: 'android.permission.USE_SIP',
PROCESS_OUTGOING_CALLS: 'android.permission.PROCESS_OUTGOING_CALLS',
BODY_SENSORS:  'android.permission.BODY_SENSORS',
SEND_SMS: 'android.permission.SEND_SMS',
RECEIVE_SMS: 'android.permission.RECEIVE_SMS',
READ_SMS: 'android.permission.READ_SMS',
RECEIVE_WAP_PUSH: 'android.permission.RECEIVE_WAP_PUSH',
RECEIVE_MMS: 'android.permission.RECEIVE_MMS',
READ_EXTERNAL_STORAGE: 'android.permission.READ_EXTERNAL_STORAGE',
WRITE_EXTERNAL_STORAGE: 'android.permission.WRITE_EXTERNAL_STORAGE',

alignItems:'flex-start,center,flex-end,stretch',
constructor:'1',
alignSelf:'12',
backfaceVisibility:'124',
borderBottomColor:'123413',
borderBottomLeftRadius:'123',
borderBottomRightRadius:'123',
borderBottomWidth:'123',
borderColor:'1234',
borderLeftColor:'12',
borderLeftWidth:'123',
borderRadius:'123',
borderRightColor:'123',
borderStyle:'124',
borderTopColor:'124',
borderTopLeftRadius:'123',
borderTopRightRadius:'123',
borderTopWidth:'124',
borderWidth:1,
backgroundColor:1,
bottom:1,
color:1,
decomposedMatrix:1,
elevation:1,
flex:1,
flexBasis:1,
flexDirection:'row,column,row-reverse,column-reverse',
flexGrow:1,
flexShrink:1,
flexWrap:1,
fontFamily:1,
fontSize:1,
fontStyle:1,
fontVariant:1,
fontWeight:1
height:1,
justifyContent:'center,flex-start,flex-end,space-around,space-between',
left:1,
letterSpacing:1,
lineHeight:1,
margin:1,
marginBottom:1,
marginHorizontal:1,
marginLeft:1,
marginRight:1,
marginTop:1,
maxHeight:1,
maxWidth:1,
minWidth:1,
opacity:1,
overflow:1,
overlayColor:1,
padding:1,
paddingBottom:1,
paddingTop:1,
paddingVertical:1,
position:'absolute',
resizeMode:1,
right:1,
rotation:1,
scaleX:1,
scaleY:1,
shadowColor:1,
shadowOffset:1,
shadowOpacity:1,
shadowRadius:1,
textAlign:'auto', 'left', 'right', 'center', 'justify',
textAlignVertical:'auto', 'top', 'bottom', 'center',
textDecorationColor:1,
textDecorationLine:1,
textDecorationStyle:1,
textShadowColor:1,
textShadowOffset:1,
textShadowRadius:1,
tintColor:1,
top:1,
transform:1,
transformMatrix:1,
translateX:1,
translatrY:1,
width:1,
writingDirection:1,
zIndex:1,
