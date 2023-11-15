import { Console } from '@woowacourse/mission-utils';
import Bill from './Bill.js';

const OutputView = {
  printGreeting() {
    Console.print("안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.");
  },
  printRewardHeader(date) {
    Console.print(`12월 ${date}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n`);
  },
  printMenu(orders) {
    Console.print("<주문 메뉴>");
    orders.map((order) => {
      Console.print(`${order[0]} ${order[1]}개\n`);
    })
  },
  printTotalPrice(order) {
    Console.print("<할인 전 총주문 금액>");
    Console.print(`${Number.toLocaleString(Bill.calculateTotalPrice(order))}원\n`);
  },
  printGiveaway(order) {
    Console.print("<증정 메뉴>");
    Console.print(`${Bill.calculateGiveaway(order)}\n`);
  },
  printRewardList(order, date) {
    Console.print("<혜택 내역>");
    if (Bill.isDDayDiscount(date)) Console.print(`크리스마스 디데이 할인: -${Number.toLocaleString(Bill.calculateDDayDiscount(date))}원`);
    if (Bill.isWeekdayDiscount(order, date)) Console.print(`평일 할인: -${Number.toLocaleString(Bill.calculateWeekdayDiscount(order, date))}원`);
    if (Bill.isWeekendDiscount(order, date)) Console.print(`주말 할인: -${Number.toLocaleString(Bill.calculateWeekendDiscount(order, date))}원`);
    if (Bill.isSpecialDay(date)) Console.print(`특별 할인: -${Number.toLocaleString(Bill.calculateSpecialDiscount(date))}원`);
    if (Bill.isGiveaway(order)) Console.print(`증정 이벤트: -25,000원`);
    if (!Bill.isDiscount(order, date)) Console.print("없음");
    Console.print("");
  },
  printTotalReward(order, date) {
    Console.print("<총혜택 금액>");
    if (Bill.isDiscount(order, date)) {
      Console.print(`-${Number.toLocaleString(Bill.calculateTotalReward(order, date))}원\n`);
      return;
    }
    Console.print("0원\n");
  },
  printDiscountPrice(order, date) {
    Console.print("<할인 후 예상 결제 금액>");
    Console.print(`${Number.toLocaleString(Bill.calculateTotalPrice(order)-Bill.calculateTotalDiscount(order, date))}원\n`);
  },
  printEventBadge(order, date) {
    Console.print("<12월 이벤트 배지>");
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