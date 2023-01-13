import { createFormContext } from "@mantine/form";

interface NewItemFormValues {
  name: string;
  buy: number;
  sell: number;
  enchantment: number;
  fraction: Fraction;
}

export enum Fraction {
  TF = "Thetford",
  BW = "Bridgewatch",
  FS = "Fort Sterling",
  ML = "Martlock",
  LYM = "Lymhurst",
}

// You can give context variables any name
export const [
  UserFormProvider,
  useUserFormContext,
  useUserForm,
] = createFormContext<NewItemFormValues>();
