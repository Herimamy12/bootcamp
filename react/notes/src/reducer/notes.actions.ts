import type {Note} from '../types/note';
import type {NotesAction} from './notes.types';

export const addNote = (note: Note): NotesAction => ({
  type: 'ADD_NOTE',
  payload: note,
});

export const updateNote = (note: Note): NotesAction => ({
  type: 'UPDATE_NOTE',
  payload: note,
});

export const deleteNote = (id: string): NotesAction => ({
  type: 'DELETE_NOTE',
  payload: id,
});

export const setSearch = (search: string): NotesAction => ({
  type: 'SET_SEARCH',
  payload: search,
});

export const setEditingNote = (note: Note | null): NotesAction => ({
  type: 'SET_EDITING_NOTE',
  payload: note,
});
