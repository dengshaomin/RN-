import {observable} from 'mobx';

class ScrollControl {
  @observable screenEnable = true
  @observable scrollPos = 0
  // 切换控制
  toggleEnable = () =>{
    this.screenEnable = !this.screenEnable
  }

  // 设置scroll位置
  setScrollPos = (pos) =>{
    this.scrollPos = pos
  }

}

export default new ScrollControl
