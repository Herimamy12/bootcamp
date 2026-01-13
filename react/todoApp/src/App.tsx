import { useState } from "react";
import { Check, X, Trash } from "lucide-react";

function App() {
    const [	todos, setTodos ] = useState([
        {name: 'Apprendre React', done: false},
        {name: 'Installer Tailwind', done: true},
        {name: 'Créer une Todo App', done: false},
        {name: 'Publier sur GitHub', done: false},
        {name: 'Partager avec des amis', done: true},
      ]);

    const toggleTodo = (index: number) => {
      const newTodos = [...todos];
      newTodos[index].done = !newTodos[index].done;
      setTodos(newTodos);
    }

    const addTodo = (name: string) => {
      const newTodos = [...todos, {name, done: false}];
      setTodos(newTodos);
    }

    const deleteTodo = (index: number) => {
      const newTodos = todos.filter((_, i) => i !== index);
      setTodos(newTodos);
    }

  return (
    <div className="min-h-screen w-screen flex justify-center bg-base-300">
      <div className="card w-full max-w-md h-3/4 bg-base-100 shadow-sm shadow-accent my-8">
        <div className="card-body space-y-4">
          
          {/* Titre */}
          <h1 className="text-3xl font-bold text-center">
            📝 Todo App
          </h1>

          {/* Input + bouton */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ajouter une tâche..."
              className="input input-bordered w-full"
            />
            <button
              onClick={() => {
                const input = document.querySelector('input');
                if (input && input.value.trim() !== '') {
                  addTodo(input.value.trim());
                  input.value = '';
                }
              }}
              className="btn btn-primary"
            >
              Ajouter
            </button>
          </div>

          {/* Liste avec map */}
          <ul className="space-y-2">
            {todos.map((task, index) => (
              <li
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg bg-base-200 ${
                  task.done ? 'opacity-60 line-through' : ''
                }`}
              >
                <span>{task.name}</span>
                <span>
                  {task.done ? (
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => toggleTodo(index)}
                    >
                      <X />
                    </button>
                  ) : (
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => toggleTodo(index)}
                    >
                      <Check />
                    </button>
                  )}
                  <button
                    className="btn btn-sm btn-outline btn-warning ml-2"
                    onClick={() => deleteTodo(index)}
                  >
                    <Trash />
                  </button>
                </span>
              </li>
            ))}
          </ul>

        </div>
      </div>
    </div>
  )
}

export default App
