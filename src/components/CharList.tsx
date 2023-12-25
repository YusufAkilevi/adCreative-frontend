import React, { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import CharListItem from "./CharListItem";
import useKeyPress from "../hooks/useKeyPress";

interface Char {
  id: number;
  name: string;
  episodesPlayIn: number;
  image: string;
}

interface CharListProps {
  charList: Char[];
  loading: boolean;
}

const CharList: React.FC<CharListProps> = ({ charList, loading }) => {
  // Hook to detect arrow key presses
  const arrowUpPressed = useKeyPress("ArrowUp");
  const arrowDownPressed = useKeyPress("ArrowDown");

  // State to track the selected index
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  // Effect to handle ArrowUp key press
  useEffect(() => {
    if (arrowUpPressed) {
      setSelectedIndex((prevState) =>
        prevState !== 0 ? prevState - 1 : charList.length - 1
      );
    }
  }, [arrowUpPressed, charList.length]);

  // Effect to handle ArrowDown key press
  useEffect(() => {
    if (arrowDownPressed) {
      setSelectedIndex((prevState) =>
        prevState !== charList.length - 1 ? prevState + 1 : 0
      );
    }
  }, [arrowDownPressed, charList.length]);

  // Effect to focus on the selected item
  useEffect(() => {
    const allCharacters = Array.from(document.querySelectorAll("li"));
    if (arrowDownPressed || arrowUpPressed) {
      allCharacters[selectedIndex]?.focus();
    }
  }, [arrowDownPressed, arrowUpPressed, selectedIndex]);

  return (
    <section className="border border-slate-300 mt-3 w-[90%] sm:w-[35%] max-h-96 overflow-y-scroll rounded-lg shadow-md">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <ul className="flex flex-col">
          {charList.map((char, i) => (
            <CharListItem
              key={char.id}
              character={char}
              setSelectedIndex={setSelectedIndex}
              selectedIndex={selectedIndex}
              i={i}
            />
          ))}
        </ul>
      )}
    </section>
  );
};

export default CharList;
