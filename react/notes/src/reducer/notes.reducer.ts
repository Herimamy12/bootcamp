import type { NotesAction, NotesState } from "./notes.types";

export const notesReducer = (
  state: NotesState,
  action: NotesAction
): NotesState => {
  switch (action.type) {
    case "ADD_NOTE":
      return {
        ...state,
        notes: [action.payload, ...state.notes],
        }
    case "UPDATE_NOTE":
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id ? action.payload : note
        ),
      }
    case "DELETE_NOTE":
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload),
      }
    case "SET_SEARCH":
      return {
        ...state,
        search: action.payload,
      }
    default:
      return state;
  }
};
