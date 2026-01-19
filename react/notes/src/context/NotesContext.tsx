import { createContext } from "react";
import type { NotesState, NotesAction } from "../reducer/notes.types";

interface NotesContextType {
    state: NotesState;
    dispatch: React.Dispatch<NotesAction>;
}

export const NotesContext = createContext<NotesContextType | undefined>(undefined);
