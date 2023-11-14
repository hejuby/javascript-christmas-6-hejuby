import { MENU } from './constant/Constant.js';

class Bill {
  static calculateTotalPrice(order) {
    return order.reduce((acc, cur) => acc + MENU[cur[0]].PRICE * cur[1], 0);
  }

  static isGiveaway(order) {
    return this.calculateTotalPrice(order) >= 120000;
  }

  static isWeekend(day) {
    return day % 7 === 1 ||  day % 7 === 2;
  }

  static isWeekday(day) {
    return !this.isWeekend(day);
  }

  static isSpecialDay(day) {
    return day % 7 === 3 || day === 25;
  }

  static calculateDDayDiscount(day) {
    if (day <= 25) return 1000 + (day-1) * 100;
    return 0;
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

  static calculateWholeDiscount(order, day) {
    return this.calculateWeekendDiscount(order, day) + this.calculateWeekdayDiscount(order, day) + this.calculateSpecialDiscount(day);
  }

  static calculateWholeReward(order, day) {
    if (this.isGiveaway(this.calculateTotalPrice(order))) return this.calculateWholeDiscount(order, day) + 25000;
    return this.calculateWholeDiscount(order, day);
  }

  static calculateBadge(order, day) {
    const wholeReward = this.calculateWholeReward(order, day);
    if (wholeReward >= 20000) return "산타";
    if (wholeReward >= 10000) return "트리";
    if (wholeReward >= 5000) return "별";
    return "없음";
  }
}

export default Bill;