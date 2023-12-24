import { XMarkIcon } from "@heroicons/react/20/solid";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";

import CharacterContext from "../context/character-context";

const CharSearchInput = ({ inputChangeHandler }) => {
  const characterCtx = useContext(CharacterContext);

  const backspaceHandler = (e) => {
    if (e.key === "Backspace" && e.target.value === "") {
      characterCtx.removeLastSelectedChar();
    }
  };
  return (
    <section className="w-[90%] sm:w-[35%] relative shadow-md mt-20 rounded-lg border border-slate-300 flex flex-wrap gap-1 p-1 pr-8">
      {characterCtx.selectedChars.map((char) => (
        <div
          key={char.id}
          className="bg-slate-200 rounded px-1 w-fit h-fit text-nowrap	text-gray-600 font-medium flex"
        >
          <span>{char.name}</span>
          <button onClick={characterCtx.toggleCharacter.bind(this, char)}>
            <XMarkIcon className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      ))}
      <input
        onChange={inputChangeHandler}
        onKeyDown={backspaceHandler}
        type="text"
        className=" focus:outline-none"
        placeholder="Search a character"
      />
      <ChevronDownIcon className="w-6 h-6 absolute right-2 top-1/2 -translate-y-1/2 text-gray-600" />
    </section>
  );
};
export default CharSearchInput;
