import { Select } from "@mantine/core";
import { useUserFormContext } from "../store/formContext";

function TierInput() {
  const form = useUserFormContext();

  return (
    <Select
      label="Select tier"
      placeholder="Pick one"
      {...form.getInputProps("tier")}
      data={["2", "3", "4", "5", "6", "7", "8"]}
    />
  );
}

export default TierInput;
