import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Button, Group } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import InputDrawer from "../components/AddItemDrawer";

import { useUserFormContext } from "../store/formContext";
import { useContext, useEffect } from "react";
import { auth } from "../server";
import { ItemEntity } from "../interfaces";
import { AuthContext, useAuth } from "../store/authContext";
import { GetServerSidePropsContext } from "next";
import nookies from "nookies";
import { firebaseAdmin } from "../firebaseAdmin";

interface Props {
  itemEntities: ItemEntity[];
  message: string;
}

export default function IndexPage(props: Props) {
  const [isDrawerOpen, toggleDrawer] = useToggle();

  const form = useUserFormContext();

  return (
    <>
      <InputDrawer isOpened={isDrawerOpen} toggle={toggleDrawer} />
      <Button
        onClick={async () => {
          auth.onAuthStateChanged(async function (user) {
            if (user) {
              const res = await fetch(`/api/hello?name=${user.uid}`);
              console.log(await res.json());
            } else {
            }
          });
        }}
      >
        {form.values.fraction}
      </Button>
      {props.itemEntities.map((e) => (
        <Button>{e.name}</Button>
      ))}
      {<Button>{props.message}</Button>}
      <Group position="center">
        <Button onClick={() => toggleDrawer()}>Open Drawer</Button>
      </Group>
    </>
  );
}
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const cookies = nookies.get(ctx);
  console.log(cookies.token);
  const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);

  // the user is authenticated!
  const { uid } = token;

  let items = {};
  const res = await fetch(`http://localhost:3000/api/hello?name=${uid}`);

  items = await res.json();

  return {
    props: {
      itemEntities: items,
    },
  };
};
