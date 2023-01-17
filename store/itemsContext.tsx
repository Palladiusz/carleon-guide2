import React, { createContext, useState } from "react";
import { ItemEntity } from "../interfaces";

interface ItemsContextProps {
  gameItems: ItemEntity[];
  setCurrentItems: (newItems: ItemEntity[]) => void;
}

export const ItemsContext = createContext<ItemsContextProps>({
  gameItems: [],
  setCurrentItems: () => {},
});

export function ItemsProvider({ children }: any) {
  const [gameItems, setCurrentItems] = useState<ItemEntity[]>([]);

  return (
    <ItemsContext.Provider value={{ gameItems, setCurrentItems }}>
      {children}
    </ItemsContext.Provider>
  );
}
