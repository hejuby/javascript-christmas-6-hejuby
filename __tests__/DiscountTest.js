import Bill from '../src/Bill.js'

describe("디스카운트 로직 테스트", () => {
  const orders = [['양송이수프', 2], ['티본스테이크', 1], ['해산물파스타', 1], ['초코케이크', 1], ['레드와인', 1]];
  const orders_new = [['티본스테이크', 1], ['바비큐립', 1], ['초코케이크', 2], ['제로콜라', 1]];
  const christmas = 25;
  const weekend = 29;
  const date_new = 3;

  test("주문 배열이 주어지면 총주문 금액을 반환한다.", () => {
    expect(Bill.calculateTotalPrice(orders)).toBe(177000);
  });

  test("총주문 금액이 12만원 이상이면 증정 이벤트를 적용한다.", () => {
    expect(Bill.calculateGiveaway(orders)).toEqual("샴페인 1개");
  });

  test("25일의 경우 디데이 할인 최대치를 적용한다.", () => {
    expect(Bill.calculateDDayDiscount(christmas)).toBe(3400);
  });

  test("디데이 할인, 평일 할인, 특별 할인이 모두 해당될 경우 이를 중복 적용한다.", () => {
    expect(Bill.calculateTotalDiscount(orders, christmas)).toBe(6423);
  });

  test("주말에는 주말 할인을 적용한다.", () => {
    expect(Bill.calculateWeekendDiscount(orders, weekend)).toBe(4046);
  });

  test("증정품 가격을 포함하여 총혜택 금액을 계산한다.", () => {
    expect(Bill.calculateTotalReward(orders, christmas)).toBe(31423);
  });

  test("총혜택 금액에 따라서 이벤트 배지를 부여한다.", () => {
    expect(Bill.calculateEventBadge(orders, christmas)).toEqual("산타");
    expect(Bill.calculateEventBadge(orders, weekend)).toEqual("산타");
  });

  test("예시에 있는 날짜와 메뉴 주문값을 사용한 테스트", () => {
    expect(Bill.calculateTotalPrice(orders_new)).toBe(142000);
    expect(Bill.calculateGiveaway(orders_new)).toEqual("샴페인 1개");
    expect(Bill.calculateDDayDiscount(date_new)).toBe(1200);
    expect(Bill.calculateWeekdayDiscount(orders_new, date_new)).toBe(4046);
    expect(Bill.calculateSpecialDiscount(date_new)).toBe(1000);
  });
});