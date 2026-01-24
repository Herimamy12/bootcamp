import { useEffect, useState } from "react";

function App() {
  const [started, setStarted] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    let interval: number;
    if (started) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 59) {
            setMinutes((prevMinutes) => prevMinutes + 1);
            return 0;
          }
          return prevSeconds + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [started]);

  const start = () => {
    setStarted(!started);
  };

  const reset = () => {
    setSeconds(0);
    setMinutes(0);
    setStarted(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="card card-border bg-base-300 px-8 shadow-sm">

        <div className="flex justify-end items-end mt-4">
          <div className={`badge ${started ? "badge-accent" : "badge-error"}`}>{started ? "Running" : "Stopped"}</div>
        </div>

        <div className="card-body items-center">
          <h1 className="card-title">Miniteur</h1>

          <div className="card bg-base-100 items-center">
            <div className="card-body text-2xl font-mono">
              {minutes.toString().padStart(2, "0")}:
              {seconds.toString().padStart(2, "0")}
            </div>
          </div>

          <div className="flex justify-between w-full m-1">
            <button
              className={`btn ${started ? "btn-error" : "btn-success"}`}
              onClick={start}
            >
              {started ? "stop" : "start"}
            </button>
            <button className="btn btn-outline" onClick={reset}>
              reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
