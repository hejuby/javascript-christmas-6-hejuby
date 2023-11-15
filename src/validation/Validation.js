import { MENU } from '../constant/Constant.js';

class Validation {
  static returnFormattedDate(input) {
    this.checkIfDateBlank(input);
    const date = Number(input);
    this.checkIfDateNumber(date);
    this.checkIfDateInteger(date);
    this.checkIfDateInRange(date);
    return date;
  }

  static returnFormattedOrder(input) {
    this.checkIfOrderBlank(input);
    const orders = this.checkFormatAndReturnSplitOrder(input);
    this.checkIfOrderHasMenus(orders);
    this.checkIfOrderDuplicate(orders);
    this.checkIfOrderOnlyDrink(orders);
    this.checkIfOrderMoreThanLimit(orders);
    return orders;
  }

  static checkIfDateBlank(input) {
    if (input.trim().length === 0) throw new Error("[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.");
  }

  static checkIfDateNumber(date) {
    if (isNaN(date)) throw new Error("[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.");
  }

  static checkIfDateInteger(date) {
    if (!Number.isInteger(date)) throw new Error("[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.");
  }

  static checkIfDateInRange(date) {
    if (date < 1 || date > 31) throw new Error("[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.");
  }

  static checkIfOrderBlank(input) {
    if (input.trim().length === 0) throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
  }

  static checkFormatAndReturnSplitOrder(input) {
    return input.split(",").map((el) => el.split("-").map((el, index) => {
      if (index === 1) return Number(el);
      if (index > 1) throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
      return el;
    }));
  }

  static checkIfOrderHasMenus(orders) {
    orders.forEach((order) => {
      if (typeof MENU[order[0]] === "undefined") throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
      if (!Number.isInteger(order[1]) || order[1] < 1) throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
    });
  }

  static checkIfOrderDuplicate(orders) {
    if (orders.length !== new Set(orders.map((order) => order[0])).size) throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
  }

  static checkIfOrderOnlyDrink(orders) {
    if (orders.length === orders.filter((order) => MENU[order[0]].TYPE === "음료").length) throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
  }

  static checkIfOrderMoreThanLimit(orders) {
    if (orders.reduce((acc, cur) => acc + cur[1], 0) > 20) throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
  }
};

export default Validation;
