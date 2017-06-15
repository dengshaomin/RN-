import {observable} from 'mobx';

import ShoppingCartData from '../Store/ShoppingCartData';

class ShoppingCartControl {
  @observable size = Object.keys(ShoppingCartData[0].viewData).length
  @observable totalAmount = 0
  @observable editStatus = false
  // @observable.shallow shopData = ShoppingCartData
  @observable shopData = ShoppingCartData
  @observable selectQuantity = 0  //选择数量
  @observable selectedAmount = 0  //选择金额
  @observable selectAll = false   //普通全选
  @observable editSelectAll = false //编辑全选
  @observable editSelected = 0
  @observable deleteButton = false
}

export default new ShoppingCartControl
