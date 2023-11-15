import Validation from "../src/validation/Validation.js";

describe("유효성 검사 클래스 테스트", () => {
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
