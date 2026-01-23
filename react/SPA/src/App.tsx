import ErrorBoundary from "./components/ErrorBoundary";
import { Navbar } from "./components/Navbar";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-base-200">
        <Navbar />
        <AppRouter />
      </div>
    </ErrorBoundary>
  );
}

export default App;
