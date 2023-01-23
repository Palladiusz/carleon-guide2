import { Button, Center, Collapse, Table } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import InputDrawer from "../components/AddItemDrawer";
import { useUserFormContext } from "../store/formContext";
import { ItemEntity } from "../interfaces";
import { GetServerSidePropsContext } from "next";
import nookies from "nookies";
import { firebaseAdmin } from "../firebaseAdmin";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faCheck,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { ItemsContext } from "../store/itemsContext";
import SingleItemRow from "../components/singleItemRow";
import Cart from "../components/Cart";
import { SearchContext } from "../store/searchContext";
import { AuthContext } from "../store/authContext";
import { showNotification } from "@mantine/notifications";

interface Props {
  itemEntities: ItemEntity[];
}

export default function IndexPage(props: Props) {
  const [isDrawerOpen, toggleDrawer] = useToggle();
  const [showCart, setShowCart] = useToggle();
  const { gameItems, setCurrentItems } = useContext(ItemsContext);
  const { searchTerm } = useContext(SearchContext);
  const auth = useContext(AuthContext);

  useEffect(() => {
    setCurrentItems(props.itemEntities);
  }, []);

  let filteredItems = gameItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onDragEnd = async (result: any) => {
    if (!result.destination) {
      return;
    }

    const newItems = Array.from(gameItems);
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);

    const newIdsOrder = newItems.map((e) => e.id);

    setCurrentItems(newItems);
    const body = { newIdsOrder, uid: auth.user?.uid };
    console.log(JSON.stringify(body));

    await fetch("https://carleon-guide2.netlify.app/api/listOrder", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        showNotification({
          title: data.message,
          message: "",
          icon: <FontAwesomeIcon icon={faCheck} />,
        });
      })
      .catch(() =>
        showNotification({
          title: "Error",
          message: "Failed to edit item",
          color: "red",
        })
      );
  };

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
      <DragDropContext onDragEnd={onDragEnd}>
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

          <Droppable droppableId="table">
            {(provided, snapshot) => (
              <tbody ref={provided.innerRef} style={{ textAlign: "center" }}>
                {filteredItems.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.id.toString()}
                    index={index}
                    isDragDisabled={searchTerm !== ""}
                  >
                    {(provided, snapshot) => {
                      return (
                        <SingleItemRow
                          dragRef={provided.innerRef}
                          dragProp={provided.draggableProps}
                          dragHandleprop={provided.dragHandleProps}
                          key={item.id}
                          item={item}
                        />
                      );
                    }}
                  </Draggable>
                ))}
              </tbody>
            )}
          </Droppable>
        </Table>
      </DragDropContext>
    </>
  );
}
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  let items: ItemEntity[] = [];
  let orderedIdList: string[] = [];

  const cookies = nookies.get(ctx);

  if (cookies.token) {
    try {
      const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);

      // the user is authenticated!
      if (token) {
        const { uid } = token;

        await fetch(`https://carleon-guide2.netlify.app/api/hello?name=${uid}`)
          .then((response) => response.json())
          .then((data) => {
            items = data;
          });

        await fetch(
          `https://carleon-guide2.netlify.app/api/listOrder?name=${uid}`
        )
          .then((response) => response.json())
          .then((data) => {
            orderedIdList = data;
          });

        items = items.sort((a, b) => {
          const aIndex = orderedIdList.indexOf(a.id);
          const bIndex = orderedIdList.indexOf(b.id);

          if (aIndex < bIndex) {
            return -1;
          }
          if (aIndex > bIndex) {
            return 1;
          }

          return 0;
        });
      }
    } catch (error) {}
  }
  return {
    props: {
      itemEntities: items,
    },
  };
};
