import { useState } from "react";

interface Note {
  id: number;
  content: string;
}

function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [value, setValue] = useState("");

  const addNote = () => {
    if (value.trim() === "") return;
    
    setNotes((prevNotes) => [
      ...prevNotes,
      { id: Date.now(), content: value }
    ]);
    setValue("");
  };

  const deleteNote = (id: number) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📝 Notes</h1>

      <div className="card bg-base-100 shadow mb-6">
        <div className="card-body">
          <div className="flex gap-2">
            <input
              className="input input-bordered w-full"
              placeholder="New note..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <button className="btn btn-primary" onClick={addNote}>
              Add Note
            </button>
          </div>
        </div>
      </div>

      {notes.length === 0 ? (
        <div className="alert alert-info">
          <span>No notes yet. Add one above!</span>
        </div>
      ) : (
        <div>
          {notes.map((note) => (
            <div
              key={note.id}
              className="card bg-base-100 shadow"
            >
              <div className="card-body flex-row justify-between items-center">
                <p>{note.content}</p>
                <button
                  className="btn btn-sm btn-error mt-2"
                  onClick={() => deleteNote(note.id)}
                >
                  x
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default Notes;