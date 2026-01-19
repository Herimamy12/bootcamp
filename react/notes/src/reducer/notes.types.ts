import type {Note} from '../types/note';

export interface NotesState {
  notes: Note[];
  search: string;
  editingNote: Note | null;
}

export type NotesAction =
  | {type: 'ADD_NOTE'; payload: Note}
  | {type: 'UPDATE_NOTE'; payload: Note}
  | {type: 'DELETE_NOTE'; payload: string}
  | {type: 'SET_SEARCH'; payload: string}
  | {type: 'SET_EDITING_NOTE'; payload: Note | null};