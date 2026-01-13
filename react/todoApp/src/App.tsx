function App() {
    const todo = [
        {name: 'Apprendre React', done: false},
        {name: 'Installer Tailwind', done: true}
      ];

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
            <button className="btn btn-primary">
              Ajouter
            </button>
          </div>

          {/* Liste avec map */}
          <ul className="space-y-2">
            {todo.map((task, index) => (
              <li
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg bg-base-200 ${
                  task.done ? 'opacity-60 line-through' : ''
                }`}
              >
                <span>{task.name}</span>
                {task.done ? (
                  <button className="btn btn-sm btn-error">✕</button>
                ) : (
                  <button className="btn btn-sm btn-success">✔</button>
                )}
              </li>
            ))}
          </ul>

        </div>
      </div>
    </div>
  )
}

export default App
