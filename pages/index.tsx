import {
  Button,
  Divider,
  Drawer,
  Grid,
  Group,
  NumberInput,
  Select,
  TextInput,
} from "@mantine/core";
import { useState } from "react";
import EnchantInput from "../components/EnchantInput";
import FractionInput from "../components/FractionInput";
import { useUserFormContext } from "../store/formContext";

export default function IndexPage() {
  const [opened, setOpened] = useState(false);
  const form = useUserFormContext();
  return (
    <>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Register"
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
        />{" "}
        <Divider my="sm" />
        <NumberInput
          defaultValue={18}
          parser={(value) => value && value.replace(/\$\s?|(,*)/g, "")}
          placeholder="Sell price"
          label="Sell price"
          min={0}
          {...form.getInputProps("sell")}
        />{" "}
        <Divider my="sm" />
        <EnchantInput />
        <Divider my="sm" />
        <FractionInput />
        <Divider my="sm" />
        <Select
          label="Your favorite framework/library"
          placeholder="Pick one"
          data={[
            { value: "react", label: "React" },
            { value: "ng", label: "Angular" },
            { value: "svelte", label: "Svelte" },
            { value: "vue", label: "Vue" },
          ]}
        />
        <Button
          onClick={() => {
            console.log(form.values.name);
            console.log(form.values.buy);
            console.log(form.values.sell);
            console.log(form.values.enchantment);

            setOpened(false);
          }}
        >
          Submit
        </Button>
      </Drawer>
      <Group position="center">
        <Button onClick={() => setOpened(true)}>Open Drawer</Button>
      </Group>
      <Grid justify="center" align="center">
        <Grid.Col span={3}>
          {" "}
          <TextInput placeholder="Item name" label="Item name" />
        </Grid.Col>
        <Grid.Col span={3}>
          {" "}
          <NumberInput
            defaultValue={18}
            parser={(value) => value && value.replace(/\$\s?|(,*)/g, "")}
            placeholder="Buy price"
            label="Buy price"
            min={0}
          />
        </Grid.Col>
        <Grid.Col span={3}>
          {" "}
          <NumberInput
            defaultValue={18}
            parser={(value) => value && value.replace(/\$\s?|(,*)/g, "")}
            placeholder="Sell price"
            label="Sell price"
            min={0}
          />
        </Grid.Col>{" "}
        <Grid.Col span={3}>
          {" "}
          <NumberInput
            defaultValue={18}
            parser={(value) => value && value.replace(/\$\s?|(,*)/g, "")}
            placeholder="Sell price"
            label="Sell price"
            min={0}
          />
        </Grid.Col>
      </Grid>
    </>
  );
}
