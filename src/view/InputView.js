import { Console } from '@woowacourse/mission-utils';
import { MESSAGE } from '../constant/Message.js';
import Validation from '../validation/Validation.js';

const InputView = {
  async readDate() {
    while (true) {
      try {
        const input = await Console.readLineAsync(MESSAGE.DATE_INPUT);
        return Validation.returnFormattedDate(input);
      } catch (error) {
        Console.print(error.message);
      }
    }
  },
  async readOrder() {
    while (true) {
      try {
        const input = await Console.readLineAsync(MESSAGE.ORDER_INPUT);
        return Validation.returnFormattedOrder(input);
      } catch (error) {
        Console.print(error.message);
      }
    }
  }
};

export default InputView;