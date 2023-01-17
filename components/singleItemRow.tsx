import { faCheck, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, NumberInput, TextInput } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useContext, useState } from "react";

import { ItemEntity } from "../interfaces";
import { AuthContext } from "../store/authContext";
import { ItemsContext } from "../store/itemsContext";
import { calculateProfitInPercentages } from "../utils/calculations";
import { getImgUrl } from "../utils/getImgUrl";
import ItemImage from "./ItemImage";

interface ITableElementsProps {
  item: ItemEntity;
}

function SingleItemRow(rowProps: ITableElementsProps) {
  const {
    name,
    buy,
    sell,
    tier,
    enchant,
    id,
    fraction,
    quantity,
  } = rowProps.item;
  const [isEdit, setIsEdit] = useState(false);
  const [editValues, setEditValues] = useState({ name, buy, sell, quantity });
  const auth = useContext(AuthContext);
  const { gameItems, setCurrentItems } = useContext(ItemsContext);

  async function handleEditSubmit() {
    setIsEdit(false);

    const modifiedItem = { ...rowProps.item, ...editValues };

    const body = { modifiedItem, uid: auth.user?.uid };
    console.log(body);

    const res = await fetch("http://localhost:3000/api/hello", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedList = gameItems.map((e) =>
          e.id === data.editedItem.id ? data.editedItem : e
        );

        setCurrentItems(updatedList);

        showNotification({
          title: data.editedItem.name,
          message: data.message,
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
  }

  async function handleDelete() {
    const body = { itemId: id, uid: auth.user?.uid };

    const res = await fetch("http://localhost:3000/api/hello", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedList = gameItems.filter((e) => e.id !== id);

        setCurrentItems(updatedList);

        showNotification({
          title: name,
          message: data.message,
          icon: <FontAwesomeIcon icon={faTrash} />,
        });
      })
      .catch(() =>
        showNotification({
          title: "Error",
          message: "Failed to delete item",
          color: "red",
        })
      );
  }

  return (
    <tr key={id}>
      <td>
        {isEdit ? (
          <NumberInput
            defaultValue={quantity}
            value={editValues.quantity}
            min={0}
            onChange={(e) => {
              setEditValues({
                ...editValues,
                quantity: e!,
              });
            }}
          />
        ) : (
          quantity
        )}
      </td>
      <td>
        <ItemImage enchant={enchant} name={name} tier={tier} />
      </td>
      <td>
        {isEdit ? (
          <TextInput
            defaultValue={name}
            value={editValues.name}
            onChange={(e) => {
              setEditValues({
                ...editValues,
                name: e.target.value,
              });
            }}
          />
        ) : (
          name
        )}
      </td>
      <td>
        {isEdit ? (
          <NumberInput
            defaultValue={buy}
            value={editValues.buy}
            min={0}
            onChange={(e) => {
              setEditValues({
                ...editValues,
                buy: e!,
              });
            }}
          />
        ) : (
          buy
        )}
      </td>
      <td>
        {isEdit ? (
          <NumberInput
            defaultValue={sell}
            value={editValues.sell}
            min={0}
            onChange={(e) => {
              setEditValues({
                ...editValues,
                sell: e!,
              });
            }}
          />
        ) : (
          sell
        )}
      </td>
      <td>{sell - buy}</td>
      <td>{calculateProfitInPercentages(buy, sell)}</td>
      <td>{tier}</td>
      <td>{enchant}</td>
      <td>{fraction}</td>
      <td>
        <Button.Group orientation="vertical">
          {isEdit ? (
            <Button
              onClick={handleEditSubmit}
              leftIcon={<FontAwesomeIcon icon={faCheck} />}
              size="xs"
            >
              Save
            </Button>
          ) : (
            <Button
              onClick={() => {
                setIsEdit(true);
              }}
              leftIcon={<FontAwesomeIcon icon={faEdit} />}
              size="xs"
            >
              Edit
            </Button>
          )}

          <Button
            onClick={handleDelete}
            leftIcon={<FontAwesomeIcon icon={faTrash} />}
            size="xs"
          >
            Delete
          </Button>
        </Button.Group>
      </td>
    </tr>
    // <tr key={id}>
    //   <th className="w-24 h-20">
    //     <div>
    //       {isEdit ? (
    //         <input
    //           type="number"
    //           placeholder="Quantity"
    //           name="quantity"
    //           value={editValues.quantity}
    //           onChange={(e) => {
    //             setEditValues({
    //               ...editValues,
    //               quantity: parseInt(e.target.value),
    //             });
    //           }}
    //           className="w-full bg-orange-700 bg-opacity-40 rounded border border-gray-700 focus:ring-2 focus:ring-indigo-900 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
    //         />
    //       ) : (
    //         quantity
    //       )}
    //     </div>
    //   </th>
    //   <td className="w-24">
    //     <img
    //       src={getImgUrl({ name, tier, enchant })}
    //       alt="new"
    //       className="w-24"
    //     />
    //   </td>
    //   <td className="w-24 h-20 text-center">
    //     {isEdit ? (
    //       <input
    //         type="text"
    //         placeholder="Item name"
    //         name="name"
    //         value={editValues.name}
    //         onChange={(e) => {
    //           setEditValues({ ...editValues, name: e.target.value });
    //         }}
    //         className="w-full bg-orange-700 bg-opacity-40 rounded border border-gray-700 focus:ring-2 focus:ring-indigo-900 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
    //       />
    //     ) : (
    //       name
    //     )}
    //   </td>
    //   <td className="w-24 h-20  text-center">
    //     {isEdit ? (
    //       <input
    //         type="number"
    //         placeholder="Buy price"
    //         name="buy"
    //         value={editValues.buy}
    //         onChange={(e) => {
    //           setEditValues({ ...editValues, buy: parseInt(e.target.value) });
    //         }}
    //         className="w-full bg-orange-700 bg-opacity-40 rounded border border-gray-700 focus:ring-2 focus:ring-indigo-900 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
    //       />
    //     ) : (
    //       numberWithSpaces(buy)
    //     )}
    //   </td>
    //   <td className="w-24 h-20  text-center">
    //     {isEdit ? (
    //       <input
    //         type="number"
    //         placeholder="Sell price"
    //         name="sell"
    //         value={editValues.sell}
    //         onChange={(e) => {
    //           setEditValues({ ...editValues, sell: parseInt(e.target.value) });
    //         }}
    //         className="w-full bg-orange-700 bg-opacity-40 rounded border border-gray-700 focus:ring-2 focus:ring-indigo-900 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
    //       />
    //     ) : (
    //       numberWithSpaces(sell)
    //     )}
    //   </td>
    //   <td className="w-24 h-20  text-center">{numberWithSpaces(sell - buy)}</td>
    //   <td className="w-24 h-20  text-center">
    //     {calculateProfitInPercentages(buy, sell)}
    //   </td>
    //   <td className="w-24 h-20  text-center">{tier}</td>
    //   <td className="w-24 h-20  text-center">{enchant}</td>
    //   <td className="w-24 h-20  text-center flex items-center justify-center mt-3">
    //     {isEdit ? (
    //       <SmallButton
    //         children={<FaCheck />}
    //         handleClick={() => {
    //           handleEditSubmit();
    //           setIsEdit(false);
    //         }}
    //       />
    //     ) : (
    //       <SmallButton
    //         children={<FaEdit />}
    //         handleClick={() => {
    //           setIsEdit(true);
    //         }}
    //       />
    //     )}

    //     <SmallButton
    //       children={<FaTrashAlt />}
    //       handleClick={() => {
    //         deleteItem(id);
    //         dispatch(removeItem({ id: id }));
    //       }}
    //     />
    //   </td>
    // </tr>
  );
}

export default SingleItemRow;
