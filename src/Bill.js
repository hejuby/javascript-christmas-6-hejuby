import { MENU } from './constant/Constant.js';

class Bill {
  static calculateTotalPrice(order) {
    return order.reduce((acc, cur) => acc + MENU[cur[0]].PRICE * cur[1], 0);
  }

  static isDDayDiscount(date) {
    return date <= 25;
  }

  static isGiveaway(order) {
    return this.calculateTotalPrice(order) >= 120000;
  }

  static isWeekend(date) {
    return date % 7 === 1 || date % 7 === 2;
  }

  static isWeekday(date) {
    return !this.isWeekend(date);
  }

  static hasMainMenu(orders) {
    orders.forEach((order) => {
      if (MENU[order[0]].TYPE === "메인") return true;
    });
    return false;
  }

  static hasDessertMenu(orders) {
    orders.forEach((order) => {
      if (MENU[order[0]].TYPE === "디저트") return true;
    });
    return false;
  }

  static isWeekendDiscount(order, date) {
    return this.isWeekend(date) && this.hasMainMenu(order);
  }

  static isWeekdayDiscount(order, date) {
    return this.isWeekday(date) && this.hasDessertMenu(order);
  }

  static isSpecialDay(date) {
    return date % 7 === 3 || date === 25;
  }

  static isDiscount(order, date) {
    return this.isDDayDiscount(date) || this.isGiveaway(order) || this.isWeekendDiscount(order, date) || this.isWeekdayDiscount(order, date) || this.isSpecialDay(date);
  }

  static calculateDDayDiscount(date) {
    if (this.isDDayDiscount(date)) return 1000 + (date-1) * 100;
    return 0;
  }

  static calculateGiveaway(order) {
    if (this.isGiveaway(order)) return "샴페인 1개";
    return "없음";
  }

  static calculateWeekendDiscount(order, date) {
    return order.reduce((acc, cur) => {
      if (this.isWeekend(date) && MENU[cur[0]].TYPE === "메인") return acc + 2023;
      return acc;
    }, 0);
  }
  
  static calculateWeekdayDiscount(order, date) {
    return order.reduce((acc, cur) => {
      if (this.isWeekday(date) && MENU[cur[0]].TYPE === "디저트") return acc + 2023;
      return acc;
    }, 0);
  }

  static calculateSpecialDiscount(date) {
    if (this.isSpecialDay(date)) return 1000;
    return 0;
  }

  static calculateTotalDiscount(order, date) {
    return this.calculateDDayDiscount(date) + this.calculateWeekendDiscount(order, date) + this.calculateWeekdayDiscount(order, date) + this.calculateSpecialDiscount(date);
  }

  static calculateTotalReward(order, date) {
    if (this.isGiveaway(order)) return this.calculateTotalDiscount(order, date) + 25000;
    return this.calculateTotalDiscount(order, date);
  }

  static calculateEventBadge(order, date) {
    const TotalReward = this.calculateTotalReward(order, date);
    if (TotalReward >= 20000) return "산타";
    if (TotalReward >= 10000) return "트리";
    if (TotalReward >= 5000) return "별";
    return "없음";
  }
}

export default Bill;