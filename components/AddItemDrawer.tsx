import { Button, Divider, Drawer, NumberInput, TextInput } from "@mantine/core";
import { useContext, useState } from "react";
import { useUserFormContext } from "../store/formContext";
import EnchantInput from "./EnchantInput";
import FractionInput from "./FractionInput";
import TierInput from "./TierInput";
import { AuthContext } from "../store/authContext";
import { showNotification } from "@mantine/notifications";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { ItemsContext } from "../store/itemsContext";

interface Props {
  toggle: () => void;
  isOpened: boolean;
}
const InputDrawer: React.FC<Props> = ({ toggle, isOpened }) => {
  const auth = useContext(AuthContext);
  const { gameItems, setCurrentItems } = useContext(ItemsContext);

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
        parser={(value) => value && value.replace(/\$\s?|(,*)/g, "")}
        placeholder="Buy price"
        label="Buy price"
        min={0}
        {...form.getInputProps("buy")}
      />
      <Divider my="sm" />
      <NumberInput
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
        onClick={async () => {
          const body = { ...form.values, uid: auth.user?.uid };

          const res = await fetch(
            "https://carleon-guide2.netlify.app/api/hello",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(body),
            }
          )
            .then((response) => response.json())
            .then((data) => {
              setCurrentItems([...gameItems, data.newItem]);

              form.reset();
              toggle();

              showNotification({
                title: data.newItem.name,
                message: data.message,
                icon: <FontAwesomeIcon icon={faCheck} />,
              });
            })
            .catch(() =>
              showNotification({
                title: "Error",
                message: "Failed to add item",
                color: "red",
              })
            );
        }}
      >
        Submit new item
      </Button>
    </Drawer>
  );
};

export default InputDrawer;
