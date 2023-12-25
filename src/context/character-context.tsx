import React, { createContext, useState, ReactNode } from "react";

interface Character {
  id: number;
  name: string;
  episodesPlayIn: number;
  image: string;
}

interface CharacterContextProps {
  selectedChars: Character[];
  toggleCharacter: (character: Character) => void;
  removeLastSelectedChar: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const CharacterContext = createContext<CharacterContextProps>({
  selectedChars: [],
  toggleCharacter: () => {},
  removeLastSelectedChar: () => {},
  searchQuery: "",
  setSearchQuery: () => {},
});

interface CharacterContextProviderProps {
  children: ReactNode;
}

export const CharacterContextProvider: React.FC<
  CharacterContextProviderProps
> = ({ children }) => {
  const [selectedChars, setSelectedChars] = useState<Character[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const toggleCharacter = (character: Character) => {
    if (!selectedChars.some((char) => char.id === character.id)) {
      setSelectedChars((prevState) => [...prevState, character]);
    } else {
      setSelectedChars((prevState) =>
        prevState.filter((char) => char.id !== character.id)
      );
    }
  };

  const removeLastSelectedChar = () => {
    if (selectedChars.length > 0) {
      setSelectedChars((prevState) => {
        const lastChar = prevState[prevState.length - 1];
        return prevState.filter((char) => char.id !== lastChar.id);
      });
    }
  };

  return (
    <CharacterContext.Provider
      value={{
        selectedChars,
        toggleCharacter,
        removeLastSelectedChar,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export default CharacterContext;
