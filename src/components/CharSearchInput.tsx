import { XMarkIcon } from "@heroicons/react/20/solid";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const CharSearchInput = ({
  selectedChars,
  removeCharHandler,
  inputChangeHandler,
  backspaceHandler,
}) => {
  return (
    <section className="w-[90%] sm:w-[35%] relative shadow-md mt-20 rounded-lg border border-slate-300 flex flex-wrap gap-1 p-1 pr-8">
      {selectedChars.map((char) => (
        <div
          key={char.id}
          className="bg-slate-200 rounded px-1 w-fit h-fit text-nowrap	text-gray-600 font-medium flex"
        >
          <span>{char.name}</span>
          <button onClick={removeCharHandler.bind(this, char)}>
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
