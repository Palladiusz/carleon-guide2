import { Select } from "@mantine/core";
import { Fraction, useUserFormContext } from "../store/formContext";

function FractionInput() {
  const form = useUserFormContext();

  return (
    <Select
      label="Select fraction"
      placeholder="Pick one"
      {...form.getInputProps("fraction")}
      data={[Fraction.TF, Fraction.BW, Fraction.FS, Fraction.LYM, Fraction.ML]}
    />
  );
}

export default FractionInput;
