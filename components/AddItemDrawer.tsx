import { Button, Divider, Drawer, NumberInput, TextInput } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { useState } from "react";
import { useUserFormContext } from "../store/formContext";
import EnchantInput from "./EnchantInput";
import FractionInput from "./FractionInput";
import TierInput from "./TierInput";

interface Props {
  toggle: () => void;
  isOpened: boolean;
}
const InputDrawer: React.FC<Props> = ({ toggle, isOpened }) => {
  const form = useUserFormContext();

  return (
    <Drawer
      opened={isOpened}
      onClose={() => toggle()}
      title="Add new item"
      padding="xl"
      size="xl"
    >
      <TextInput
        placeholder="Item name"
        label="Item name"
        {...form.getInputProps("name")}
      />
      <Divider my="sm" />
      <NumberInput
        defaultValue={18}
        parser={(value) => value && value.replace(/\$\s?|(,*)/g, "")}
        placeholder="Buy price"
        label="Buy price"
        min={0}
        {...form.getInputProps("buy")}
      />
      <Divider my="sm" />
      <NumberInput
        defaultValue={18}
        parser={(value) => value && value.replace(/\$\s?|(,*)/g, "")}
        placeholder="Sell price"
        label="Sell price"
        min={0}
        {...form.getInputProps("sell")}
      />
      <Divider my="sm" />
      <EnchantInput />
      <Divider my="sm" />
      <TierInput />
      <Divider my="sm" />
      <FractionInput />
      <Divider my="sm" />
      <Button
        onClick={() => {
          console.log(form.values.name);
          console.log(form.values.buy);
          console.log(form.values.sell);
          console.log(form.values.enchantment);
          form.reset();

          toggle();
        }}
      >
        Submit
      </Button>
    </Drawer>
  );
};

export default InputDrawer;
