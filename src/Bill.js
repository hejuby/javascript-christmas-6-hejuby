import { MENU } from './constant/Constant.js';

class Bill {
  static calculateTotalPrice(order) {
    return order.reduce((acc, cur) => acc + MENU[cur[0]].PRICE * cur[1], 0);
  }

  static isDDayDiscount(day) {
    return day <= 25;
  }

  static isGiveaway(order) {
    return this.calculateTotalPrice(order) >= 120000;
  }

  static isWeekend(day) {
    return day % 7 === 1 || day % 7 === 2;
  }

  static isWeekday(day) {
    return !this.isWeekend(day);
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

  static isWeekendDiscount(order, day) {
    return this.isWeekend(day) && this.hasMainMenu(order);
  }

  static isWeekdayDiscount(order, day) {
    return this.isWeekday(day) && this.hasDessertMenu(order);
  }

  static isSpecialDay(day) {
    return day % 7 === 3 || day === 25;
  }

  static isDiscount(order, day) {
    return this.isDDayDiscount(day) || this.isGiveaway(order) || this.isWeekendDiscount(order, day) || this.isWeekdayDiscount(order, day) || this.isSpecialDay(day);
  }

  static calculateDDayDiscount(day) {
    if (this.isDDayDiscount(day)) return 1000 + (day-1) * 100;
    return 0;
  }

  static calculateGiveaway(order) {
    if (this.isGiveaway(order)) return "샴페인 1개";
    return "없음";
  }

  static calculateWeekendDiscount(order, day) {
    return order.reduce((acc, cur) => {
      if (this.isWeekend(day) && MENU[cur[0]].TYPE === "메인") return acc + 2023;
      return acc;
    }, 0);
  }
  
  static calculateWeekdayDiscount(order, day) {
    return order.reduce((acc, cur) => {
      if (this.isWeekday(day) && MENU[cur[0]].TYPE === "디저트") return acc + 2023;
      return acc;
    }, 0);
  }

  static calculateSpecialDiscount(day) {
    if (this.isSpecial(day)) return 1000;
    return 0;
  }

  static calculateTotalDiscount(order, day) {
    return this.calculateDDayDiscount(day) + this.calculateWeekendDiscount(order, day) + this.calculateWeekdayDiscount(order, day) + this.calculateSpecialDiscount(day);
  }

  static calculateTotalReward(order, day) {
    if (this.calculateGiveaway(order)) return this.calculateTotalDiscount(order, day) + 25000;
    return this.calculateTotalDiscount(order, day);
  }

  static calculateEventBadge(order, day) {
    const TotalReward = this.calculateTotalReward(order, day);
    if (TotalReward >= 20000) return "산타";
    if (TotalReward >= 10000) return "트리";
    if (TotalReward >= 5000) return "별";
    return "없음";
  }
}

export default Bill;