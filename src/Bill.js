import { MENU, CONSTANT } from './constant/Constant.js';

class Bill {
  static calculateTotalPrice(order) {
    return order.reduce((acc, cur) => acc + MENU[cur[CONSTANT.MENU_INDEX]].PRICE * cur[CONSTANT.QUANTITY_INDEX], CONSTANT.ACC_INITIAL);
  }

  static isDDayDiscount(date) {
    return date <= CONSTANT.DDAY;
  }

  static isGiveaway(order) {
    return this.calculateTotalPrice(order) >= CONSTANT.GIVEAWAY_CONDITION;
  }

  static isWeekend(date) {
    return date % CONSTANT.DAYS_OF_WEEK === CONSTANT.FRIDAY || date % CONSTANT.DAYS_OF_WEEK === CONSTANT.SATURDAY;
  }

  static isWeekday(date) {
    return !this.isWeekend(date);
  }

  static hasMainMenu(orders) {
    orders.forEach((order) => {
      if (MENU[order[CONSTANT.MENU_INDEX]].TYPE === CONSTANT.MAIN_DISH) return true;
    });
    return false;
  }

  static hasDessertMenu(orders) {
    orders.forEach((order) => {
      if (MENU[order[CONSTANT.MENU_INDEX]].TYPE === CONSTANT.DESSERT) return true;
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
    return date % CONSTANT.DAYS_OF_WEEK === CONSTANT.SUNDAY || date === CONSTANT.DDAY;
  }

  static isDiscount(order, date) {
    return this.isDDayDiscount(date) || this.isGiveaway(order) || this.isWeekendDiscount(order, date) || this.isWeekdayDiscount(order, date) || this.isSpecialDay(date);
  }

  static calculateDDayDiscount(date) {
    if (this.isDDayDiscount(date)) return CONSTANT.DDAY_DISCOUNT_START + (date-1) * CONSTANT.DDAY_DISCOUNT_PER_DAY;
    return CONSTANT.NO_DISCOUNT;
  }

  static calculateGiveaway(order) {
    if (this.isGiveaway(order)) return CONSTANT.GIVEAWAY;
    return CONSTANT.NO_GIVEAWAY;
  }

  static calculateWeekendDiscount(order, date) {
    return order.reduce((acc, cur) => {
      if (this.isWeekend(date) && MENU[cur[CONSTANT.MENU_INDEX]].TYPE === CONSTANT.MAIN_DISH) return acc + CONSTANT.WEEKEND_DISCOUNT * cur[CONSTANT.QUANTITY_INDEX];
      return acc;
    }, CONSTANT.ACC_INITIAL);
  }
  
  static calculateWeekdayDiscount(order, date) {
    return order.reduce((acc, cur) => {
      if (this.isWeekday(date) && MENU[cur[CONSTANT.MENU_INDEX]].TYPE === CONSTANT.DESSERT) return acc + CONSTANT.WEEKDAY_DISCOUNT * cur[CONSTANT.QUANTITY_INDEX];
      return acc;
    }, CONSTANT.ACC_INITIAL);
  }

  static calculateSpecialDiscount(date) {
    if (this.isSpecialDay(date)) return CONSTANT.SPECIAL_DAY_DISCOUNT;
    return CONSTANT.NO_DISCOUNT;
  }

  static calculateTotalDiscount(order, date) {
    return this.calculateDDayDiscount(date) + this.calculateWeekendDiscount(order, date) + this.calculateWeekdayDiscount(order, date) + this.calculateSpecialDiscount(date);
  }

  static calculateTotalReward(order, date) {
    if (this.isGiveaway(order)) return this.calculateTotalDiscount(order, date) + CONSTANT.GIVEAWAY_PRICE;
    return this.calculateTotalDiscount(order, date);
  }

  static calculateEventBadge(order, date) {
    const TotalReward = this.calculateTotalReward(order, date);
    if (TotalReward >= CONSTANT.BADGE_GOLD_CONDITION) return CONSTANT.BADGE_GOLD;
    if (TotalReward >= CONSTANT.BADGE_SILVER_CONDITION) return CONSTANT.BADGE_SILVER;
    if (TotalReward >= CONSTANT.BADGE_BRONZE_CONDITION) return CONSTANT.BADGE_BRONZE;
    return CONSTANT.NO_BADGE;
  }
}

export default Bill;