import { useNotes } from "../hooks/useNotes";
import { deleteNote } from "../reducer/notes.actions";
import type { Note } from "../types/note";

interface Props {
  note: Note;
}

export const NoteItem = ({ note }: Props) => {
  const { dispatch } = useNotes();

  const handleDelete = () => {
    if (confirm("Voulez-vous supprimer cette note?")) {
      dispatch(deleteNote(note.id));
    }
  };

  const handleEdit = () => {
    // Logic to open edit modal or navigate to edit page
    console.log("Edit note:", note.id);
  };

  return (
    <div className="card bg-base-200 shadow-md p-4 space-y-2">
      <h3 className="font-bold text-lg">{note.title}</h3>
        <p>{note.content}</p>
        <div className="flex flex-wrap gap-2">
            {note.tags.map((tag) => (
                <span key={tag} className="badge badge-outline">{tag}</span>
            ))}
        </div>
      <div className="flex gap-2 mt-2">
        <button className="btn btn-sm btn-secondary" onClick={handleEdit}>
          Éditer
        </button>
        <button className="btn btn-sm btn-error" onClick={handleDelete}>
          Supprimer
        </button>
      </div>
    </div>
  );
}
