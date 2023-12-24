import { createContext, useState } from "react";

const CharacterContext = createContext({
  selectedChars: [],
  toggleCharacter: () => {},
  removeLastSelectedChar: () => {},
  searchQuery: "",
  setSearchQuery: () => {},
});

export const CharacterContextProvider = ({ children }) => {
  const [selectedChars, setSelectedChars] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const toggleCharacter = (character) => {
    if (!selectedChars.includes(character)) {
      setSelectedChars((prevState) => [...prevState, character]);
    } else {
      setSelectedChars(
        selectedChars.filter((char) => char.id !== character.id)
      );
    }
  };
  const removeLastSelectedChar = () => {
    const lastChar = selectedChars[selectedChars.length - 1];
    setSelectedChars(selectedChars.filter((char) => char.id !== lastChar.id));
  };

  return (
    <CharacterContext.Provider
      value={{
        selectedChars: selectedChars,
        toggleCharacter: toggleCharacter,
        removeLastSelectedChar: removeLastSelectedChar,
        searchQuery: searchQuery,
        setSearchQuery: setSearchQuery,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export default CharacterContext;
