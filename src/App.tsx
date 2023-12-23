import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import LoadingSpinner from "./components/LoadingSpinner";
import CharListItem from "./components/CharListItem";
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
  return (
    <main className="h-screen w-screen flex flex-col items-center ">
      <section className="w-[90%] sm:w-[35%] relative shadow-md mt-20 rounded-lg border border-slate-300 flex flex-wrap gap-1 p-1 pr-8">
        {selectedChars.map((char) => (
          <div className="bg-slate-200 rounded px-1 w-fit h-fit text-nowrap	text-gray-600 font-medium flex">
            <span>{char.name}</span>
            <button onClick={removeCharHandler.bind(this, char)}>
              <XMarkIcon className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        ))}
        <input
          onChange={inputChangeHandler}
          type="text"
          className=" focus:outline-none rounded-lg"
        />
        <ChevronDownIcon className="w-6 h-6 absolute right-2 top-1/2 -translate-y-1/2 text-gray-600" />
      </section>{" "}
      {charList.length !== 0 && (
        <section className="border border-slate-300 mt-3 w-[90%] sm:w-[35%] max-h-96 overflow-y-scroll rounded-lg shadow-md">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <ul className="flex flex-col">
              {charList.map((char) => (
                <CharListItem
                  removeCharHandler={removeCharHandler}
                  searchQuery={searchQuery}
                  key={char.id}
                  character={char}
                  setSelectedChars={setSelectedChars}
                  selectedChars={selectedChars}
                />
              ))}
            </ul>
          )}
        </section>
      )}
    </main>
  );
}

export default App;
