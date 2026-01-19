import { useState } from "react";
import type { FormEvent } from "react";
import { useNotes } from "../hooks/useNotes";
import { addNote } from "../reducer/notes.actions";

export const NoteForm = () => {
  const { dispatch } = useNotes();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = (e: FormEvent) => {
    if (!title || !content) {
        alert("Le titre et le contenu sont obligatoires.");
        return;
    }
    e.preventDefault();
    const newNote = {
      id: Date.now().toString(),
      title,
      content,
      tags: tags.split(",").map(tag => tag.trim()),
      createdAt: new Date(),
    };
    dispatch(addNote(newNote));
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
