import { useEffect, useState } from "react";

const firstLetterCapital = (text: string) => {
  return text
    .split(" ")
    .map((word: string) => word.slice(0, 1).toUpperCase() + word.slice(1))
    .join(" ");
};
const makeQueryBold = (charName: string, searchQuery: string) => {
  const startIdx = charName.toLowerCase().indexOf(searchQuery);
  const result = charName.split("");
  const searchQueryCap = firstLetterCapital(searchQuery);
  const boldQuery = (
    <strong>
      {result[startIdx - 1] === " " || startIdx === 0
        ? searchQueryCap
        : searchQuery}
    </strong>
  );

  const searchQueryLength = searchQuery.length;
  result.splice(startIdx, searchQueryLength, boldQuery);
  return result;
};

const CharListItem = ({
  character,
  searchQuery,
  setSelectedChars,
  selectedChars,
  removeCharHandler,
}) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!selectedChars.includes(character)) setChecked(false);
  }, [character, selectedChars]);

  const selectCharacter = () => {
    if (!selectedChars.includes(character)) {
      setSelectedChars((prevState) => [...prevState, character]);
      checkboxToggleHandler();
    } else {
      setSelectedChars(
        selectedChars.filter((char) => char.id !== character.id)
      );
      checkboxToggleHandler();
    }
  };
  const checkboxToggleHandler = () => {
    setChecked((prevState) => !prevState);
  };
  const keyDownHandler = (e) => {
    if (e.key === "Enter") {
      selectCharacter();
    }
  };
  return (
    <li
      onClick={selectCharacter}
      className="border-b border-gray-300 py-2 px-3 cursor-pointer flex gap-3"
    >
      <input
        type="checkbox"
        className="cursor-pointer"
        readOnly
        onKeyDown={keyDownHandler}
        checked={checked}
      />
      <label
        htmlFor={character.id}
        className="flex items-center gap-2 w-full cursor-pointer"
      >
        <div className="w-1/6 lg:w-[12%]">
          <img
            className="rounded-lg w-full"
            src={character.image}
            alt={character.name}
          />
        </div>
        <div className="flex flex-col w-5/6">
          <span className="text-gray-700">
            {makeQueryBold(character.name, searchQuery).map((letter) => (
              <span key={`${letter}${character.id * Math.random()}`}>
                {letter}
              </span>
            ))}
          </span>
          <span className="text-sm text-gray-500">
            {`${character.episodesPlayIn} ${
              character.episodesPlayIn !== 1 ? "Episodes" : "Episode"
            }`}
          </span>
        </div>
      </label>
    </li>
  );
};
export default CharListItem;
