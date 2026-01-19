import { NoteForm } from "../components/NoteForm";
import { NoteList } from "../components/NoteList";
import { SearchBar } from "../components/SearchBar";

export const Home = () => {
  return (
    <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Mes Notes</h1>
        <SearchBar />
        <NoteForm />
        <NoteList />
    </div>
  );
}
