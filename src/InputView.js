import { Console } from '@woowacourse/mission-utils';
import { MENU } from './constant/Constant.js';

export default InputView = {
  async readDate() {
    while (true) {
      try {
        const input = await Console.readLineAsync("12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n");
        if (input.trim().length === 0) throw new Error("[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.");
        if (isNaN(Number(input))) throw new Error("[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.");
        if (Number(input) < 1 || Number(input) > 31) throw new Error("[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.");
        return Number(input);
      } catch (error) {
        Console.print(error.message);
      }
    }
  },
  async readOrder() {
    while (true) {
      try {
        const input = await Console.readLineAsync("주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n");
        if (input.trim().length === 0) throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
        const orders = input.split(",").map((el) => el.split("-"));
        orders.forEach((order) => {
          if (MENU[order[0]] === undefined) throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
          if (!Number.isInteger(order[1]) || order[1] < 1) throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
        })
        if (orders.length !== new Set(orders.map((order) => order[0]))) throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
        if (orders.length === orders.filter((order) => MENU[order[0]].TYPE === "드링크")) throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
        if (orders.reduce((acc, cur) => acc + cur[1], 0) > 20) throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
        return orders;
      } catch (error) {
        Console.print(error.message);
      }
    }
  }
}
