import { Button, Center, Collapse, Table } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import InputDrawer from "../components/AddItemDrawer";
import { useUserFormContext } from "../store/formContext";
import { ItemEntity } from "../interfaces";
import { GetServerSidePropsContext } from "next";
import nookies from "nookies";
import { firebaseAdmin } from "../firebaseAdmin";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { ItemsContext } from "../store/itemsContext";
import SingleItemRow from "../components/SingleItemRow";
import Cart from "../components/Cart";

interface Props {
  itemEntities: ItemEntity[];
}

export default function IndexPage(props: Props) {
  const [isDrawerOpen, toggleDrawer] = useToggle();
  const [showCart, setShowCart] = useToggle();
  const { gameItems, setCurrentItems } = useContext(ItemsContext);

  useEffect(() => {
    setCurrentItems(props.itemEntities);
  }, []);

  let rows;

  const form = useUserFormContext();

  if (gameItems.length > 0) {
    rows = gameItems.map((element) => {
      return <SingleItemRow key={element.id} item={element} />;
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

      <Center>
        <Button.Group>
          <Button
            leftIcon={<FontAwesomeIcon icon={faPlus} />}
            onClick={() => toggleDrawer()}
          >
            Add new item!
          </Button>
          <Button
            leftIcon={<FontAwesomeIcon icon={faCartShopping} />}
            onClick={() => setShowCart()}
          >
            Show cart
          </Button>
        </Button.Group>
      </Center>

      <Collapse in={showCart}>
        <Cart />
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
    </>
  );
}
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  let items = {};
  let totalIncome = 0;
  let totalOutcome = 0;
  let percentageIncome = "0%";
  const cookies = nookies.get(ctx);

  const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);

  // the user is authenticated!
  if (token) {
    const { uid } = token;

    const res = await fetch(`http://localhost:3000/api/hello?name=${uid}`)
      .then((response) => response.json())
      .then((data) => {
        items = data;
      });
  }

  return {
    props: {
      itemEntities: items,
      totalIncome,
      totalOutcome,
      percentageIncome,
    },
  };
};
