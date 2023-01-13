import { Button, Group } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import InputDrawer from "../components/AddItemDrawer";

import { useUserFormContext } from "../store/formContext";

export default function IndexPage() {
  const [isDrawerOpen, toggleDrawer] = useToggle();

  const form = useUserFormContext();
  return (
    <>
      <InputDrawer isOpened={isDrawerOpen} toggle={toggleDrawer} />
      <Button>{form.values.fraction}</Button>
      <Group position="center">
        <Button onClick={() => toggleDrawer()}>Open Drawer</Button>
      </Group>
    </>
  );
}
