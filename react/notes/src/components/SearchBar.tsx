import { useNotes } from "../hooks/useNotes";
import { setSearch } from "../reducer/notes.actions";

export const SearchBar = () => {
  const { state, dispatch } = useNotes();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };

  return (
    <input
      type="text"
      placeholder="Rechercher des notes..."
      value={state.search}
      onChange={handleChange}
    />
  );
};
