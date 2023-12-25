import { XMarkIcon } from "@heroicons/react/20/solid";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useContext, ChangeEvent, KeyboardEvent } from "react";

import CharacterContext from "../context/character-context";

// Define the type for the character data
interface Char {
  id: number;
  name: string;
  episodesPlayIn: number;
  image: string;
}

interface CharSearchInputProps {
  inputChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CharSearchInput: React.FC<CharSearchInputProps> = ({
  inputChangeHandler,
}) => {
  const characterCtx = useContext(CharacterContext);

  // Event handler for Backspace key
  const backspaceHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && e.currentTarget.value === "") {
      characterCtx.removeLastSelectedChar();
    }
  };

  return (
    <section className="w-[90%] sm:w-[35%] relative shadow-md mt-20 rounded-lg border border-slate-300 flex flex-wrap gap-1 p-1 pr-8">
      {/* Display selected characters */}
      {characterCtx.selectedChars.map((char: Char) => (
        <div
          key={char.id}
          className="bg-slate-200 rounded px-1 w-fit h-fit text-nowrap	text-gray-600 font-medium flex"
        >
          <span>{char.name}</span>
          <button onClick={() => characterCtx.toggleCharacter(char)}>
            <XMarkIcon className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      ))}

      {/* Input for character search */}
      <input
        onChange={inputChangeHandler}
        onKeyDown={backspaceHandler}
        type="text"
        className="focus:outline-none"
        placeholder="Search a character"
      />

      {/* Chevron Down Icon */}
      <ChevronDownIcon className="w-6 h-6 absolute right-2 top-1/2 -translate-y-1/2 text-gray-600" />
    </section>
  );
};

export default CharSearchInput;
