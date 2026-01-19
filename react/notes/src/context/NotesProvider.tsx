import { useReducer } from "react";
import { notesReducer, initialState } from "../reducer/notes.reducer";
import { NotesContext } from "./NotesContext";

interface Props {
  children: React.ReactNode;
}

export const NotesProvider = ({children}: Props) => {
  const [state, dispatch] = useReducer(notesReducer, initialState);

  return (
    <NotesContext.Provider value={{state, dispatch}}>
      {children}
    </NotesContext.Provider>
  );
};
