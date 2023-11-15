import OutputView from "./view/OutputView.js";
import InputView from './view/InputView.js';

class App {
  async run() {
    OutputView.printGreeting();
    const day = await InputView.readDate();
    const order = await InputView.readOrder();
    OutputView.printPreview(order, day);
  }
}

export default App;
