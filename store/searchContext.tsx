import React, { createContext, useState } from "react";

interface SearchContextProps {
  searchTerm: string;
  setSearchTerm: (newTerm: string) => void;
}

export const SearchContext = createContext<SearchContextProps>({
  searchTerm: "",
  setSearchTerm: () => {},
});

export function SearchProvider({ children }: any) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
}
