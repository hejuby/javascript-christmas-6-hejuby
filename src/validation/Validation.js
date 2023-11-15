import { MENU } from '../constant/Constant.js';
import { ERROR } from '../constant/Message.js';

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
    if (input.trim().length === 0) throw new Error(ERROR.DATE);
  }

  static checkIfDateNumber(date) {
    if (isNaN(date)) throw new Error(ERROR.DATE);
  }

  static checkIfDateInteger(date) {
    if (!Number.isInteger(date)) throw new Error(ERROR.DATE);
  }

  static checkIfDateInRange(date) {
    if (date < 1 || date > 31) throw new Error(ERROR.DATE);
  }

  static checkIfOrderBlank(input) {
    if (input.trim().length === 0) throw new Error(ERROR.ORDER);
  }

  static checkFormatAndReturnSplitOrder(input) {
    return input.split(",").map((el) => el.split("-").map((el, index) => {
      if (index === 1) return Number(el);
      if (index > 1) throw new Error(ERROR.ORDER);
      return el;
    }));
  }

  static checkIfOrderHasMenus(orders) {
    orders.forEach((order) => {
      if (typeof MENU[order[0]] === "undefined") throw new Error(ERROR.ORDER);
      if (!Number.isInteger(order[1]) || order[1] < 1) throw new Error(ERROR.ORDER);
    });
  }

  static checkIfOrderDuplicate(orders) {
    if (orders.length !== new Set(orders.map((order) => order[0])).size) throw new Error(ERROR.ORDER);
  }

  static checkIfOrderOnlyDrink(orders) {
    if (orders.length === orders.filter((order) => MENU[order[0]].TYPE === "음료").length) throw new Error(ERROR.ORDER);
  }

  static checkIfOrderMoreThanLimit(orders) {
    if (orders.reduce((acc, cur) => acc + cur[1], 0) > 20) throw new Error(ERROR.ORDER);
  }
};

export default Validation;
