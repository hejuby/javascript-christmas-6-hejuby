import { Console } from '@woowacourse/mission-utils';
import Bill from './Bill.js';

export default OutputView = {
  printGreeting() {
    Console.print("안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.");
  },
  printRewardHeader(day) {
    Console.print(`12월 ${day}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n`);
  },
  printMenu(orders) {
    Console.print("<주문 메뉴>");
    orders.map((order) => {
      Console.print(`${order[0]} ${order[1]}개\n`);
    })
  },
  printTotalPrice(order) {
    Console.print("<할인 전 총주문 금액>");
    Console.print(`${Bill.calculateTotalPrice(order)}원\n`);
  },
  printGiveaway(order) {
    Console.print("<증정 메뉴>");
    Console.print(`${Bill.calculateGiveaway(order)}\n`);
  },
  printWholeReward(order, day) {
    Console.print("<혜택 내역>");
    if (Bill.isDDayDiscount(day)) Console.print(`크리스마스 디데이 할인: -${Number.toLocaleString(Bill.calculateDDayDiscount(day))}원`);
    if (Bill.isWeekdayDiscount(order, day)) Console.print(`평일 할인: -${Number.toLocaleString(Bill.calculateWeekdayDiscount(order, day))}원`);
    if (Bill.isWeekendDiscount(order, day)) Console.print(`주말 할인: -${Number.toLocaleString(Bill.calculateWeekendDiscount(order, day))}원`);
    if (Bill.isSpecialDay(day)) Console.print(`특별 할인: -${Number.toLocaleString(Bill.calculateSpecialDiscount(day))}원`);
    if (Bill.isGiveaway(order)) Console.print(`증정 이벤트: -25,000원`);
    if (!Bill.calculateWholeReward(order, day)) Console.print("없음");
    Console.print("");
  }
}
