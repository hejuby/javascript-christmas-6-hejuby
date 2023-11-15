import Validation from "../src/validation/Validation.js";

describe("날짜 입력 유효성 검사 테스트", () => {
  test("빈 문자열을 입력하면 예외가 발생한다.", () => {
    const blank = "";
    expect(() => {
      Validation.checkIfDateBlank(blank);
    }).toThrow("[ERROR]");
    expect(() => {
      Validation.checkIfOrderBlank(blank);
    }).toThrow("[ERROR]");
  });

  test("날짜에 숫자가 아닌 값을 입력하면 예외가 발생한다.", () => {
    const string = Number("12ab");
    expect(() => {
      Validation.checkIfDateNumber(string);
    }).toThrow("[ERROR]");
  });

  test("1부터 31 사이의 정수가 아닌 값은 예외가 발생한다.", () => {
    const float = Number("2.1");
    const hundred = Number("100");
    expect(() => {
      Validation.checkIfDateInteger(float);
    }).toThrow("[ERROR]");
    expect(() => {
      Validation.checkIfDateInRange(hundred);
    }).toThrow("[ERROR]");
  });
});

describe("메뉴 입력 유효성 검사 테스트", () => {
  test("대쉬('-')를 여러번 사용한 메뉴 입력 형식의 경우 예외가 발생한다.", () => {
    const dashes = "양송이수트-1-3,레드와인-2";
    expect(() => {
      Validation.checkFormatAndReturnSplitOrder(dashes);
    }).toThrow("[ERROR]");
  });

  test("메뉴에 없는 주문이 들어오면 예외가 발생한다.", () => {
    const risotto = [['버섯리조또', 1]];
    expect(() => {
      Validation.checkIfOrderHasMenus(risotto);
    }).toThrow("[ERROR]");
  });

  test("중복된 메뉴를 입력하면 예외가 발생한다.", () => {
    const pastas = [['해산물파스타', 1], ['해산물파스타', 2]];
    expect(() => {
      Validation.checkIfOrderDuplicate(pastas);
    }).toThrow("[ERROR]");
  });

  test("음료만 주문한 경우 예외가 발생한다.", () => {
    const champagne = [['샴페인', 3]];
    expect(() => {
      Validation.checkIfOrderOnlyDrink(champagne);
    }).toThrow("[ERROR]");
  });

  test("메뉴 개수가 너무 적거나 많은 경우에 예외가 발생한다.", () => {
    const low = [['바비큐립', 0]];
    const high = [['양송이수프', 10], ['크리스마스파스타', 10], ['제로콜라', 10]];
    expect(() => {
      Validation.checkIfOrderHasMenus(low);
    }).toThrow("[ERROR]");
    expect(() => {
      Validation.checkIfOrderMoreThanLimit(high);
    }).toThrow("[ERROR]");
  });
});
