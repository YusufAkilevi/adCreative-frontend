import { useContext, useState, ChangeEvent } from "react";
import CharList from "./components/CharList";
import CharSearchInput from "./components/CharSearchInput";
import CharacterContext from "./context/character-context";

// Define the type for the character data
interface Char {
  id: number;
  name: string;
  episodesPlayIn: number;
  image: string;
}

// Define the type for the error state
interface ErrorState {
  isError: boolean;
  message: string;
}

function App(): JSX.Element {
  // Access the character context
  const characterCtx = useContext(CharacterContext);

  // State for character list, loading indicator, and error state
  const [charList, setCharList] = useState<Char[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorState>({
    isError: false,
    message: "",
  });

  // Handler for input change
  const inputChangeHandler = async (
    e: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const query: string = e.target.value;

    // Update the search query in the context
    characterCtx.setSearchQuery(query);

    if (query.length !== 0) {
      try {
        // Fetch data from the API
        setLoading(true);
        const res = await fetch(
          `https://rickandmortyapi.com/api/character?name=${query}`
        );

        const data = await res.json();

        // Check for errors in the API response
        if (data.error) {
          throw new Error();
        }

        // Process the data and update the state
        const modifiedData: Char[] = data.results.map((char: any) => ({
          id: char.id,
          name: char.name,
          episodesPlayIn: char.episode.length,
          image: char.image,
        }));

        setCharList(modifiedData);
        setLoading(false);
        setError({ isError: false, message: "" });
      } catch (error) {
        // Handle errors during API request
        setError({
          isError: true,
          message: `Character "${query}" could not be found!`,
        });
        setLoading(false);
        setCharList([]);
      }
    } else {
      // Reset state when the input is empty
      setError({ isError: false, message: "" });
      setCharList([]);
    }
  };

  return (
    <main className="h-screen w-screen flex flex-col items-center">
      {/* Component for searching */}
      <CharSearchInput inputChangeHandler={inputChangeHandler} />

      {/* Display error message if there is an error */}
      {error.isError && <p className="mt-8 font-semibold">{error.message}</p>}

      {/* Display the character list if available and no error */}
      {charList.length !== 0 && !error.isError && (
        <CharList charList={charList} loading={loading} />
      )}
    </main>
  );
}

export default App;
