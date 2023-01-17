import { Fraction } from "../store/formContext";

export function getFractionColor(fraction: Fraction) {
  switch (fraction) {
    case Fraction.BW:
      return "orange";
    case Fraction.FS:
      return "gray";
    case Fraction.LYM:
      return "lime";
    case Fraction.ML:
      return "cyan";
    default:
    case Fraction.TF:
      return "grape";
  }
}
