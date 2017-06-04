// mobx初始化
import {observable} from 'mobx';

class ScrollingSideControl {
    @observable scrollPos = 0
    @observable scrollEnabled = true
}

export default new ScrollingSideControl
