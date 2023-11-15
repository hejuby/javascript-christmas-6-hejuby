import { MENU, CONSTANT } from '../constant/Constant.js';
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
    if (input.trim().length === CONSTANT.BLANK_STRING_LENGTH) throw new Error(ERROR.DATE);
  }

  static checkIfDateNumber(date) {
    if (isNaN(date)) throw new Error(ERROR.DATE);
  }

  static checkIfDateInteger(date) {
    if (!Number.isInteger(date)) throw new Error(ERROR.DATE);
  }

  static checkIfDateInRange(date) {
    if (date < CONSTANT.START_DATE || date > CONSTANT.END_DATE) throw new Error(ERROR.DATE);
  }

  static checkIfOrderBlank(input) {
    if (input.trim().length === CONSTANT.BLANK_STRING_LENGTH) throw new Error(ERROR.ORDER);
  }

  static checkFormatAndReturnSplitOrder(input) {
    return input.split(",").map((el) => el.split("-").map((el, index) => {
      if (index === CONSTANT.QUANTITY_INDEX) return Number(el);
      if (index > CONSTANT.INDEX_LIMIT) throw new Error(ERROR.ORDER);
      return el;
    }));
  }

  static checkIfOrderHasMenus(orders) {
    orders.forEach((order) => {
      if (typeof MENU[order[0]] === CONSTANT.UNDEFINED) throw new Error(ERROR.ORDER);
      if (!Number.isInteger(order[CONSTANT.QUANTITY_INDEX]) || order[CONSTANT.QUANTITY_INDEX] < CONSTANT.MIN_QUANTITY) throw new Error(ERROR.ORDER);
    });
  }

  static checkIfOrderDuplicate(orders) {
    if (orders.length !== new Set(orders.map((order) => order[CONSTANT.MENU_INDEX])).size) throw new Error(ERROR.ORDER);
  }

  static checkIfOrderOnlyDrink(orders) {
    if (orders.length === orders.filter((order) => MENU[order[CONSTANT.MENU_INDEX]].TYPE === CONSTANT.DRINK).length) throw new Error(ERROR.ORDER);
  }

  static checkIfOrderMoreThanLimit(orders) {
    if (orders.reduce((acc, cur) => acc + cur[CONSTANT.QUANTITY_INDEX], CONSTANT.ACC_INITIAL) > CONSTANT.ORDER_LIMIT) throw new Error(ERROR.ORDER);
  }
};

export default Validation;
