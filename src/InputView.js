import { Console } from '@woowacourse/mission-utils';

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
  }
  // ...
}
