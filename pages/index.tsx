import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Button, Group } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import InputDrawer from "../components/AddItemDrawer";

import { useUserFormContext } from "../store/formContext";

export default function IndexPage() {
  const [isDrawerOpen, toggleDrawer] = useToggle();

  const form = useUserFormContext();
  return (
    <>
      <InputDrawer isOpened={isDrawerOpen} toggle={toggleDrawer} />
      <Button
        onClick={() =>
          showNotification({
            title: "Default notification",
            message: "Hey there, your code is awesome! 🤥",
            icon: <FontAwesomeIcon icon={faCheck} />,
          })
        }
      >
        {form.values.fraction}
      </Button>
      <Group position="center">
        <Button onClick={() => toggleDrawer()}>Open Drawer</Button>
      </Group>
    </>
  );
}
