import { ItemEntity } from "../interfaces";
import { Fraction } from "../store/formContext";

export function calculateProfitInPercentages(buy: number, sell: number) {
  const profitValue = sell - buy;
  const value = ((profitValue / buy) * 100).toFixed(2) + "%";
  return value;
}

export function calculateTotalProfit(items: ItemEntity[]) {
  return items.map((item) => item.sell - item.buy).reduce((a, b) => a + b);
}

export function initialCalculations(items: ItemEntity[]) {
  const totalIncome = items
    .map((item) => (item.sell - item.buy) * item.quantity)
    .reduce((a, b) => a + b);
  const totalOutcome = items
    .map((item) => item.buy * item.quantity)
    .reduce((a, b) => a + b);

  const percentageTotalValue =
    ((totalIncome / totalOutcome) * 100).toFixed(2) + "%";

  return { totalIncome, totalOutcome, percentageTotalValue };
}

export function getFractionColor(fraction: Fraction) {
  switch (fraction) {
    case Fraction.BW:
      return "bg-gradient-to-b from-orange-600 to-orange-700";
    case Fraction.FS:
      return "bg-gradient-to-b from-gray-400 to-gray-500";
    case Fraction.LYM:
      return "bg-gradient-to-b from-green-600 to-green-700";
    case Fraction.ML:
      return "bg-gradient-to-b from-blue-600 to-blue-700";
    default:
    case Fraction.TF:
      return "bg-gradient-to-b from-purple-600 to-purple-700";
  }
}
