import { Console } from '@woowacourse/mission-utils';
import { MESSAGE } from '../constant/Message.js';
import Bill from '../Bill.js';

const OutputView = {
  printGreeting() {
    Console.print(MESSAGE.GREETING);
  },
  printRewardHeader(date) {
    Console.print(`${MESSAGE.REWARD_HEADER_PREFIX}${date}${MESSAGE.REWARD_HEADER_SUFFIX}`);
  },
  printMenu(orders) {
    Console.print(MESSAGE.MENU_TITLE);
    orders.map((order) => {
      Console.print(`${order[0]} ${order[1]}${MESSAGE.MENU_SUFFIX}`);
    })
    Console.print(MESSAGE.NEWLINE);
  },
  printTotalPrice(order) {
    Console.print(MESSAGE.TOTAL_PRICE_TITLE);
    Console.print(`${Bill.calculateTotalPrice(order).toLocaleString()}${MESSAGE.WON}`);
    Console.print(MESSAGE.NEWLINE);
  },
  printGiveaway(order) {
    Console.print(MESSAGE.GIVEAWAY_TITLE);
    Console.print(`${Bill.calculateGiveaway(order)}`);
    Console.print(MESSAGE.NEWLINE);
  },
  printRewardList(order, date) {
    Console.print(MESSAGE.REWARD_LIST_TITLE);
    if (!Bill.isDiscount(order, date)) {
      Console.print(MESSAGE.REWARD_LIST_NOTHING);
      return;
    }
    if (Bill.isDDayDiscount(date)) Console.print(`${MESSAGE.REWARD_LIST_DDAY}${Bill.calculateDDayDiscount(date).toLocaleString()}${MESSAGE.WON}`);
    if (Bill.isWeekdayDiscount(order, date)) Console.print(`${MESSAGE.REWARD_LIST_WEEKDAY}${Bill.calculateWeekdayDiscount(order, date).toLocaleString()}${MESSAGE.WON}`);
    if (Bill.isWeekendDiscount(order, date)) Console.print(`${MESSAGE.REWARD_LIST_WEEKEND}${Bill.calculateWeekendDiscount(order, date).toLocaleString()}${MESSAGE.WON}`);
    if (Bill.isSpecialDay(date)) Console.print(`${MESSAGE.REWARD_LIST_SPECIAL}${Bill.calculateSpecialDiscount(date).toLocaleString()}${MESSAGE.WON}`);
    if (Bill.isGiveaway(order)) Console.print(MESSAGE.REWARD_LIST_GIVEAWAY);
    Console.print(MESSAGE.NEWLINE);
  },
  printTotalReward(order, date) {
    Console.print(MESSAGE.TOTAL_REWARD_TITLE);
    if (Bill.isDiscount(order, date)) {
      Console.print(`${MESSAGE.TOTAL_REWARD_PREFIX}${Bill.calculateTotalReward(order, date).toLocaleString()}${MESSAGE.WON}`);
      Console.print(MESSAGE.NEWLINE);
      return;
    }
    Console.print(MESSAGE.TOTAL_REWARD_ZERO_WON);
  },
  printDiscountPrice(order, date) {
    Console.print(MESSAGE.DISCOUNT_PRICE_TITLE);
    Console.print(`${(Bill.calculateTotalPrice(order)-Bill.calculateTotalDiscount(order, date)).toLocaleString()}${MESSAGE.WON}`);
    Console.print(MESSAGE.NEWLINE);
  },
  printEventBadge(order, date) {
    Console.print(MESSAGE.EVENT_BADGE_TITLE);
    Console.print(Bill.calculateEventBadge(order, date));
  },
  printPreview(order, date) {
    this.printRewardHeader(date);
    this.printMenu(order);
    this.printTotalPrice(order);
    this.printGiveaway(order);
    this.printRewardList(order, date);
    this.printTotalReward(order, date);
    this.printDiscountPrice(order, date);
    this.printEventBadge(order, date);
  }
};

export default OutputView;