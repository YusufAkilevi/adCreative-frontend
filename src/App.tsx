import { useState } from "react";

import CharList from "./components/CharList";
import CharSearchInput from "./components/CharSearchInput";

interface Char {
  id: number;
  name: string;
  episodesPlayIn: number;
  image: string;
}

function App() {
  const [charList, setCharList] = useState<Char[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedChars, setSelectedChars] = useState([]);
  const [searchQuery, setSearchQuery] = useState<string>();

  const inputChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query: string = e.target.value;

    setSearchQuery(query);

    if (query.length !== 0) {
      try {
        setLoading(true);
        const res = await fetch(
          `https://rickandmortyapi.com/api/character?name=${query}`
        );

        const data = await res.json();

        const modifiedData: Char[] = data.results.map((char) => ({
          id: char.id,
          name: char.name,
          episodesPlayIn: char.episode.length,
          image: char.image,
        }));

        setCharList(modifiedData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setCharList([]);
      }
    } else {
      setCharList([]);
    }
  };
  const removeCharHandler = (character) => {
    setSelectedChars(selectedChars.filter((char) => char.id !== character.id));
  };
  const backspaceHandler = (e) => {
    if (e.key === "Backspace" && e.target.value === "") {
      const lastChar = selectedChars[selectedChars.length - 1];
      setSelectedChars(selectedChars.filter((char) => char.id !== lastChar.id));
    }
  };

  return (
    <main className="h-screen w-screen flex flex-col items-center ">
      <CharSearchInput
        selectedChars={selectedChars}
        removeCharHandler={removeCharHandler}
        inputChangeHandler={inputChangeHandler}
        backspaceHandler={backspaceHandler}
      />
      {charList.length !== 0 && (
        <CharList
          removeCharHandler={removeCharHandler}
          searchQuery={searchQuery}
          charList={charList}
          loading={loading}
          selectedChars={selectedChars}
          setSelectedChars={setSelectedChars}
        />
      )}
    </main>
  );
}

export default App;
