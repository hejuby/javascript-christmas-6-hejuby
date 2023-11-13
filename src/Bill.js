import { MENU } from './constant/Constant.js';

class Bill {
  calculateTotalOrder(order) {
    return order.reduce((acc, cur) => acc + MENU[cur[0]].PRICE * cur[1], 0);
  }
}

export default Bill;