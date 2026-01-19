import { useState } from "react";
import type { FormEvent } from "react";
import { useNotes } from "../hooks/useNotes";
import { addNote, updateNote } from "../reducer/notes.actions";
import type { Note } from "../types/note";

export const NoteForm = () => {
  const {state, dispatch} = useNotes();

  const [title, setTitle] = useState(state.editingNote?.title || "");
  const [content, setContent] = useState(state.editingNote?.content || "");
  const [tags, setTags] = useState(state.editingNote?.tags.join(", ") || "");
  const [editingNote, setEditingNote] = useState<Note | null>(null);


  const handleSubmit = (e: FormEvent) => {
    if (!title || !content) {
        alert("Le titre et le contenu sont obligatoires.");
        return;
    }
    e.preventDefault();
    if (editingNote) {
        dispatch(updateNote({
            ...editingNote,
            title,
            content,
            tags: tags.split(",").map(tag => tag.trim()),
        }));
        setEditingNote(null);
    } else {
        const newNote: Note = {
            id: crypto.randomUUID(),
            title,
            content,
            tags: tags.split(",").map(tag => tag.trim()),
            createdAt: new Date(),
        };
        dispatch(addNote(newNote));
    }
    setTitle("");
    setContent("");
    setTags("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        // type="text"
        className="input input-bordered w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Titre"
        required
      />
        <textarea
        className="textarea textarea-bordered w-full"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Contenu"
        required
      />
      <input
        className="input input-bordered w-full"
        placeholder="Tags (separe par des virgules)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
        <button className="btn btn-primary w-full">Ajouter</button>
    </form>
  );
};
