import { Table } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { ItemsContext } from "../store/itemsContext";
import { cartCalculate } from "../utils/calculations";
import { ItemEntity } from "../interfaces";

interface CartValues {
  income: number;
  outcome: number;
  percentage: string;
}

function Cart() {
  const { gameItems, setCurrentItems } = useContext(ItemsContext);

  const [values, setValues] = useState<CartValues>({
    income: 0,
    outcome: 0,
    percentage: "0%",
  });

  useEffect(() => {
    if (gameItems.length > 0) {
      const calculatedCart = cartCalculate(gameItems as ItemEntity[]);
      setValues({
        income: calculatedCart.totalIncome,
        outcome: calculatedCart.totalOutcome,
        percentage: calculatedCart.percentageIncome,
      });
    }
  }, [gameItems]);

  const cartTableHeaders = [
    "Total outcome",
    "Total income",
    "Percentage income",
  ];

  return (
    <>
      <Table striped horizontalSpacing="md" withBorder withColumnBorders>
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
            <td>{values.income}</td>
            <td>{values.outcome}</td>
            <td>{values.percentage}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}
export default Cart;
