import {observable} from 'mobx';

import ShoppingCartData from '../Store/ShoppingCartData';

class ShoppingCartControl {
  @observable size = Object.keys(ShoppingCartData[0].viewData).length
  @observable totalAmount = 0
  @observable editStatus = false
  @observable shopData = ShoppingCartData
}

export default new ShoppingCartControl
