import { useEffect, useState, useContext } from "react";

import CharacterContext from "../context/character-context";

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

const CharListItem = ({ character }) => {
  const characterCtx = useContext(CharacterContext);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!characterCtx.selectedChars.includes(character)) setChecked(false);
    else setChecked(true);
  }, [character, characterCtx.selectedChars]);

  const checkboxToggleHandler = () => {
    setChecked((prevState) => !prevState);
  };
  const clickHandler = (e) => {
    characterCtx.toggleCharacter(character);
    checkboxToggleHandler();
  };
  const keyDownHandler = (e) => {
    if (e.key === "Enter") {
      characterCtx.toggleCharacter(character);
    }
  };
  return (
    <li
      onClick={clickHandler}
      className="border-b border-gray-300 py-2 px-3 cursor-pointer flex gap-3"
    >
      <input
        type="checkbox"
        id={character.id}
        className="cursor-pointer"
        readOnly
        onKeyDown={keyDownHandler}
        checked={checked}
      />
      <div className="flex items-center gap-2 w-full cursor-pointer">
        <div className="w-1/6 lg:w-[12%]">
          <img
            className="rounded-lg w-full"
            src={character.image}
            alt={character.name}
          />
        </div>
        <div className="flex flex-col w-5/6">
          <span className="text-gray-700">
            {makeQueryBold(character.name, characterCtx.searchQuery).map(
              (letter) => (
                <span key={`${letter}${character.id * Math.random()}`}>
                  {letter}
                </span>
              )
            )}
          </span>
          <span className="text-sm text-gray-500">
            {`${character.episodesPlayIn} ${
              character.episodesPlayIn !== 1 ? "Episodes" : "Episode"
            }`}
          </span>
        </div>
      </div>
    </li>
  );
};
export default CharListItem;
