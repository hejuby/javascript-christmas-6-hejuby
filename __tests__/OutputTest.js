import { Console } from '@woowacourse/mission-utils';
import OutputView from "../src/view/OutputView.js";

describe("출력 클래스 테스트", () => {
  const orders = [['양송이수프', 2], ['티본스테이크', 1], ['해산물파스타', 1], ['초코케이크', 1], ['레드와인', 1]];
  const christmas = 25;
  const weekend = 29;
  const output = [
    "12월 25일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!",
    "<주문 메뉴>",
    "양송이수프 2개",
    "티본스테이크 1개",
    "해산물파스타 1개",
    "초코케이크 1개",
    "레드와인 1개",
    "<할인 전 총주문 금액>",
    "<증정 메뉴>",
    "샴페인 1개",
    "<혜택 내역>",
    "<총혜택 금액>",
    "<할인 후 예상 결제 금액>",
    "<12월 이벤트 배지>",
    "산타"
  ];

  const spyFn = jest.spyOn(Console, "print");

  test("혜택 미리보기 문구 출력", () => {
    OutputView.printPreview(orders, weekend);
    expect(spyFn).toHaveBeenCalledWith(expect.stringContaining("12월 29일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!"));
  });

  test("주문 배열과 날짜 변수가 주어진 경우 모든 출력 확인", () => {
    spyFn.mockClear();
    OutputView.printPreview(orders, christmas);
    output.forEach((line) => {
      expect(spyFn).toHaveBeenCalledWith(expect.stringContaining(line));
    })
  });
});
