import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Button, Center, Collapse, Group, Table, Text } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import InputDrawer from "../components/AddItemDrawer";
import Image from "next/image";
import { useUserFormContext } from "../store/formContext";
import { useContext, useEffect, useState } from "react";
import { auth } from "../server";
import { ItemEntity } from "../interfaces";
import { AuthContext, useAuth } from "../store/authContext";
import { GetServerSidePropsContext } from "next";
import nookies from "nookies";
import { firebaseAdmin } from "../firebaseAdmin";
import { getImgUrl } from "../utils/getImgUrl";
import ItemImage from "../components/ItemImage";
import { calculateProfitInPercentages } from "../utils/calculations";

interface Props {
  itemEntities: ItemEntity[];
  message: string;
}

export default function IndexPage(props: Props) {
  const [isDrawerOpen, toggleDrawer] = useToggle();
  const [showCart, setshowCart] = useToggle();
  let rows = [];

  const form = useUserFormContext();

  if (props.itemEntities.length > 0) {
    rows = props.itemEntities.map((element) => {
      const {
        name,
        enchant,
        tier,
        sell,
        buy,
        id,
        quantity,
        fraction,
      } = element;
      return (
        <tr key={id}>
          <td>{quantity}</td>
          <td>
            <ItemImage enchant={enchant} name={name} tier={tier} />
          </td>
          <td>{name}</td>
          <td>{buy}</td>
          <td>{sell}</td>
          <td>{sell - buy}</td>
          <td>{calculateProfitInPercentages(buy, sell)}</td>
          <td>{tier}</td>
          <td>
            <Center>{enchant}</Center>
          </td>
          <td>{fraction}</td>
          <td>Options</td>
        </tr>
      );
    });
  } else {
    rows = (
      <tr key={""}>
        <td></td>
      </tr>
    );
  }

  const tableHeaders = [
    "Quantity",
    "Image",
    "Item name",
    "Buy price",
    "Sell price",
    "Income",
    "Income in %",
    "Tier",
    "Ench",
    "City",
    "Options",
  ];

  const cartTableHeaders = [
    "Total outcome",
    "Total income",
    "Percentage income",
  ];

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
      <Button onClick={() => setshowCart()}>Toggle content</Button>

      <Collapse in={showCart}>
        <Table striped horizontalSpacing="md">
          <thead>
            <tr>
              {cartTableHeaders.map((e) => (
                <th key={e} style={{ textAlign: "center" }}>
                  {e}
                </th>
              ))}
            </tr>
          </thead>
          <tbody style={{ textAlign: "center" }}>
            <tr>
              <td>jgfdgfd</td>
              <td>hgf</td>
              <td>jghf</td>
            </tr>
          </tbody>
        </Table>
      </Collapse>

      <Table striped horizontalSpacing="md">
        <thead>
          <tr>
            {tableHeaders.map((e) => (
              <th key={e} style={{ textAlign: "center" }}>
                {e}
              </th>
            ))}
          </tr>
        </thead>
        <tbody style={{ textAlign: "center" }}>{rows}</tbody>
      </Table>
      {<Button>{props.message}</Button>}
      <Group position="center">
        <Button onClick={() => toggleDrawer()}>Open Drawer</Button>
      </Group>
    </>
  );
}
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  let items = {};
  const cookies = nookies.get(ctx);
  console.log(cookies.token);
  const token = await firebaseAdmin
    .auth()
    .verifyIdToken(cookies.token)
    .catch(() => console.log("erorooror"));

  // the user is authenticated!
  if (token) {
    const { uid } = token;

    const res = await fetch(`http://localhost:3000/api/hello?name=${uid}`);

    items = await res.json();
  }

  return {
    props: {
      itemEntities: items,
    },
  };
};
