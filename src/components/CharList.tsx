import LoadingSpinner from "./LoadingSpinner";
import CharListItem from "./CharListItem";

const CharList = ({
  removeCharHandler,
  searchQuery,
  charList,
  loading,
  setSelectedChars,
  selectedChars,
}) => {
  return (
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
  );
};
export default CharList;
