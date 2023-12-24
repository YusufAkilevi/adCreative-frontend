import LoadingSpinner from "./LoadingSpinner";
import CharListItem from "./CharListItem";

const CharList = ({ charList, loading }) => {
  return (
    <section className="border border-slate-300 mt-3 w-[90%] sm:w-[35%] max-h-96 overflow-y-scroll rounded-lg shadow-md">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <ul className="flex flex-col">
          {charList.map((char) => (
            <CharListItem key={char.id} character={char} />
          ))}
        </ul>
      )}
    </section>
  );
};
export default CharList;
