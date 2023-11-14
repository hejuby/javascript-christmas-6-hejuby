import { Console } from '@woowacourse/mission-utils';

export default OutputView = {
  printGreeting() {
    Console.print("안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.");
  },
  printMenu(orders) {
    Console.print("<주문 메뉴>");
    orders.map((order) => {
      Console.print(`${order[0]} ${order[1]}개`);
    })
  }
}
