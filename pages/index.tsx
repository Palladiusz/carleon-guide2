import { Button, Center, Collapse, Table } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import InputDrawer from "../components/AddItemDrawer";
import { useUserFormContext } from "../store/formContext";
import { ItemEntity } from "../interfaces";
import { GetServerSidePropsContext } from "next";
import nookies from "nookies";
import { firebaseAdmin } from "../firebaseAdmin";
import ItemImage from "../components/ItemImage";
import {
  calculateProfitInPercentages,
  cartCalculate,
} from "../utils/calculations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect } from "react";
import { ItemsContext } from "../store/itemsContext";

interface Props {
  itemEntities: ItemEntity[];
  message: string;
  totalIncome: number;
  totalOutcome: number;
  percentageIncome: string;
}

export default function IndexPage(props: Props) {
  const [isDrawerOpen, toggleDrawer] = useToggle();
  const [showCart, setshowCart] = useToggle();
  const { gameItems: items, setCurrentItems } = useContext(ItemsContext);

  useEffect(() => {
    setCurrentItems(props.itemEntities);
  }, [items]);

  let rows;

  const form = useUserFormContext();

  if (items.length > 0) {
    rows = items.map((element) => {
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
            onClick={() => setshowCart()}
          >
            Show cart
          </Button>
        </Button.Group>
      </Center>

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
              <td>{props.totalOutcome}</td>
              <td>{props.totalIncome}</td>
              <td>{props.percentageIncome}</td>
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
        const calculatedCart = cartCalculate(items as ItemEntity[]);
        totalIncome = calculatedCart.totalIncome;
        totalOutcome = calculatedCart.totalOutcome;
        percentageIncome = calculatedCart.percentageIncome;
      });

    // items = await res.json();
    // if (items) {
    //   const calculatedCart = cartCalculate(items as ItemEntity[]);
    //   totalIncome = calculatedCart.totalIncome;
    //   console.log(totalIncome);

    //   totalOutcome = calculatedCart.totalOutcome;
    //   percentageIncome = calculatedCart.percentageIncome;
    // }
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
