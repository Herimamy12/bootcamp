import { useState } from "react";
import type { FormEvent } from "react";
import { Plus, Type } from "lucide-react";

interface CreateTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (title: string) => void;
}

export const CreateTodoModal = ({ isOpen, onClose, onAdd }: CreateTodoModalProps) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Veuillez entrer un titre pour la tâche");
      return;
    }

    onAdd(title.trim());
    setTitle("");
    onClose();
  };

  const handleClose = () => {
    setTitle("");
    setError("");
    onClose();
  };

  return (
    <dialog className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box bg-base-100">
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 bg-accent rounded-full flex items-center justify-center">
            <Plus size={28} className="text-accent-content" />
          </div>
        </div>

        <h3 className="text-2xl font-bold text-center mb-2">
          Nouvelle <span className="text-accent">Tâche</span>
        </h3>
        <p className="text-center text-base-content/70 mb-6">
          Ajoutez une tâche à votre liste
        </p>

        {error && (
          <div className="alert alert-error mb-4">
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text mb-2">Titre de la tâche</span>
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <Type size={20} className="text-base-content/70" />
              <input
                type="text"
                placeholder="Ex: Acheter du lait"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="grow"
                autoFocus
              />
            </label>
          </div>

          <div className="modal-action flex gap-2">
            <button
              type="button"
              className="btn btn-ghost btn-outline rounded-none flex-1"
              onClick={handleClose}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="btn btn-accent rounded-none flex-1"
            >
              <Plus size={20} />
              Ajouter
            </button>
          </div>
        </form>
      </div>
      <div className="modal-backdrop" onClick={handleClose} />
    </dialog>
  );
};
