import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { CreateTodoModal } from "../components/CreateTodoModal";
import { LayoutList, Circle, CheckCircle, Trash2, Plus } from "lucide-react";

export const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, title: "Buy groceries", completed: false },
    { id: 2, title: "Walk the dog", completed: true },
    { id: 3, title: "Read a book", completed: false },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("create") === "true") {
      setIsModalOpen(true);
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const addTodo = (title: string) => {
    const newId = todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1;
    setTodos([...todos, { id: newId, title, completed: false }]);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((t) => t.id !== id));
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
