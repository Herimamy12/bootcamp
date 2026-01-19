import { useNotes } from "../hooks/useNotes";
import { NoteItem } from "./NoteItem";

export const NoteList = () => {
  const { state } = useNotes();

    const filteredNotes = state.notes.filter((note) =>
        note.title.toLowerCase().includes(state.search.toLowerCase()) ||
        note.content.toLowerCase().includes(state.search.toLowerCase()) ||
        note.tags.some((tag) => tag.toLowerCase().includes(state.search.toLowerCase()))
    );

    if (filteredNotes.length === 0) {
        return <p className="text-center mt-8">Aucune note trouvée.</p>;
    }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredNotes.map((note) => (
        <NoteItem key={note.id} note={note} />
      ))}
    </div>
  );
}
