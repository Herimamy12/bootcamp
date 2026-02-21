import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Navbar } from "../components/Navbar";
import { CreateTodoModal } from "../components/CreateTodoModal";
import { LayoutList, Circle, CheckCircle, Trash2, Plus } from "lucide-react";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  userId: string;
}

export const TodoList = () => {
  const { user } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const fetchTodos = useCallback(async () => {
    if (!user) return;
    try {
      const res = await fetch(`http://localhost:3000/api/todos/${user.id}`);
      if (!res.ok) throw new Error("Erreur lors du chargement des tâches");
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur serveur");
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  useEffect(() => {
    if (searchParams.get("create") === "true") {
      setIsModalOpen(true);
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const addTodo = async (title: string) => {
    if (!user) return;
    try {
      const res = await fetch("http://localhost:3000/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, userId: user.id }),
      });
      if (!res.ok) throw new Error("Erreur lors de la création");
      const newTodo = await res.json();
      setTodos([...todos, newTodo]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur serveur");
    }
  };

  const toggleTodo = async (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    try {
      const res = await fetch(`http://localhost:3000/api/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !todo.completed }),
      });
      if (!res.ok) throw new Error("Erreur lors de la mise à jour");
      const updated = await res.json();
      setTodos(todos.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur serveur");
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3000/api/todos/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erreur lors de la suppression");
      setTodos(todos.filter((t) => t.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur serveur");
    }
  };

  return (
    <div className="flex min-w-screen flex-col gap-4 min-h-screen items-center bg-linear-to-br from-base-300 via-gray-900 to-base-300">
      <Navbar />
      <div className="w-full max-w-4xl mt-24 px-4">
        <div className="card bg-base-100 shadow-2xl">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-4">
              <div className="badge badge-accent badge-lg h-14 w-14 rounded-full">
                <LayoutList size={28} />
              </div>
              <h2 className="card-title text-3xl font-bold">
                Mes <span className="text-accent">Tâches</span>
              </h2>
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn btn-accent rounded-none btn-sm ml-auto"
              >
                <Plus size={18} />
                Ajouter
              </button>
            </div>
            <p className="text-base-content/70 mb-6">
              {todos.filter((t) => !t.completed).length} tâche(s) restante(s)
            </p>
            {error && (
              <div className="alert alert-error mb-4">
                <span>{error}</span>
              </div>
            )}
            {isLoading ? (
              <div className="flex justify-center py-8">
                <span className="loading loading-spinner loading-lg text-accent"></span>
              </div>
            ) : (
            <ul className="space-y-3">
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className={`flex items-center gap-3 p-4 rounded-none border border-base-300 transition-colors hover:bg-base-200 ${
                    todo.completed ? "opacity-60" : ""
                  }`}
                >
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className="btn btn-ghost btn-sm btn-square"
                  >
                    {todo.completed ? (
                      <CheckCircle size={22} className="text-success" />
                    ) : (
                      <Circle size={22} className="text-base-content/40" />
                    )}
                  </button>
                  <span
                    className={`text-lg flex-1 ${
                      todo.completed ? "line-through text-base-content/50" : ""
                    }`}
                  >
                    {todo.title}
                  </span>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="btn btn-ghost btn-sm btn-square text-error hover:bg-error/20"
                  >
                    <Trash2 size={18} />
                  </button>
                </li>
              ))}
            </ul>
            )}
          </div>
        </div>
      </div>
      <CreateTodoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addTodo}
      />
    </div>
  );
};
