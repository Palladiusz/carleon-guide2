import { Fraction } from "./store/formContext";

export interface ItemEntity {
  id: string;
  name: string;
  buy: number;
  sell: number;
  tier: number;
  enchant: number;
  quantity: number;
  fraction: Fraction;
}
