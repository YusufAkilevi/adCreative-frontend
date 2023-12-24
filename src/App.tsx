import { useContext, useState } from "react";

import CharList from "./components/CharList";
import CharSearchInput from "./components/CharSearchInput";
import CharacterContext from "./context/character-context";

interface Char {
  id: number;
  name: string;
  episodesPlayIn: number;
  image: string;
}

function App() {
  const characterCtx = useContext(CharacterContext);

  const [charList, setCharList] = useState<Char[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState({ isError: false, message: "" });

  const inputChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query: string = e.target.value;

    characterCtx.setSearchQuery(query);

    if (query.length !== 0) {
      try {
        setLoading(true);
        const res = await fetch(
          `https://rickandmortyapi.com/api/character?name=${query}`
        );

        const data = await res.json();

        if (data.error) {
          throw new Error();
        }
        const modifiedData: Char[] = data.results.map((char) => ({
          id: char.id,
          name: char.name,
          episodesPlayIn: char.episode.length,
          image: char.image,
        }));

        setCharList(modifiedData);
        setLoading(false);
        setError({ isError: false, message: "" });
      } catch (error) {
        setError({
          isError: true,
          message: `Character "${query}" could not be found!`,
        });
        setLoading(false);
        setCharList([]);
      }
    } else {
      setError({ isError: false, message: "" });
      setCharList([]);
    }
  };

  return (
    <main className="h-screen w-screen flex flex-col items-center ">
      <CharSearchInput inputChangeHandler={inputChangeHandler} />
      {error.isError && <p className="mt-8 font-semibold">{error.message}</p>}
      {charList.length !== 0 && !error.isError && (
        <CharList charList={charList} loading={loading} />
      )}
    </main>
  );
}

export default App;
