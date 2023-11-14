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
  }
}
