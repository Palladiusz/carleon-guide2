import { ItemEntity } from "../interfaces";
import { Fraction } from "../store/formContext";

export function calculateProfitInPercentages(buy: number, sell: number) {
  const profitValue = sell - buy;
  const value = ((profitValue / buy) * 100).toFixed(2) + "%";
  if (isNaN(profitValue)) {
    return "0%";
  }
  return value;
}

export function calculateTotalProfit(items: ItemEntity[]) {
  return items.map((item) => item.sell - item.buy).reduce((a, b) => a + b);
}

export function cartCalculate(items: ItemEntity[]) {
  const totalIncome = items
    .map((item) => (item.sell - item.buy) * item.quantity)
    .reduce((a, b) => a + b);
  const totalOutcome = items
    .map((item) => item.buy * item.quantity)
    .reduce((a, b) => a + b);

  let percentageIncome = ((totalIncome / totalOutcome) * 100).toFixed(2) + "%";

  if (isNaN((totalIncome / totalOutcome) * 100)) {
    percentageIncome = "0%";
  }

  return { totalIncome, totalOutcome, percentageIncome };
}
