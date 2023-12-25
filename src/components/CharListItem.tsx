import React, { useEffect, useState, useContext, KeyboardEvent } from "react";
import CharacterContext from "../context/character-context";

interface Char {
  id: number;
  name: string;
  episodesPlayIn: number;
  image: string;
}

interface CharListItemProps {
  character: Char;
  i: number;
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
}

const firstLetterCapital = (text: string): string => {
  return text
    .split(" ")
    .map((word: string) => word.slice(0, 1).toUpperCase() + word.slice(1))
    .join(" ");
};

const makeQueryBold = (
  charName: string,
  searchQuery: string
): JSX.Element[] => {
  const startIdx = charName.toLowerCase().indexOf(searchQuery);
  const result: (string | React.ReactElement)[] = charName.split("");
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

  return result.map((letter, index) => (
    <span key={`${letter}${index}`}>{letter}</span>
  ));
};

const CharListItem: React.FC<CharListItemProps> = ({
  character,
  i,
  selectedIndex,
  setSelectedIndex,
}) => {
  const characterCtx = useContext(CharacterContext);
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    setChecked(characterCtx.selectedChars.includes(character));
  }, [character, characterCtx.selectedChars]);

  const checkboxToggleHandler = () => {
    setChecked((prevState) => !prevState);
  };

  const clickHandler = () => {
    characterCtx.toggleCharacter(character);
    checkboxToggleHandler();
    setSelectedIndex(i);
  };

  const keyDownCheckboxHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      characterCtx.toggleCharacter(character);
    }
  };

  const keyDownListHandler = (e: KeyboardEvent<HTMLLIElement>) => {
    if (e.key === "Enter") {
      clickHandler();
    }
  };

  return (
    <li
      role="button"
      tabIndex={0}
      aria-pressed={i === selectedIndex}
      onClick={clickHandler}
      onKeyDown={keyDownListHandler}
      className="border-b border-gray-300 py-2 px-3 cursor-pointer flex gap-3"
    >
      <input
        type="checkbox"
        id={character.id.toString()}
        className="cursor-pointer"
        readOnly
        onKeyDown={keyDownCheckboxHandler}
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
            {makeQueryBold(character.name, characterCtx.searchQuery)}
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
