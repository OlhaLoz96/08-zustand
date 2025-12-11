import axios from "axios";
import type { Note, NoteFormValues, NoteTag } from "../types/note";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
const myToken = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export const fetchNotes = async (
  search: string,
  page: number,
  categoryId?: NoteTag
): Promise<FetchNotesResponse> => {
  const response = await axios.get<FetchNotesResponse>("/notes", {
    params: {
      search: search,
      page: page,
      perPage: 12,
      tag: categoryId,
    },
    headers: {
      Authorization: `Bearer ${myToken}`,
    },
  });

  return response.data;
};

export const createNote = async (newNote: NoteFormValues): Promise<Note> => {
  const response = await axios.post<Note>("/notes", newNote, {
    headers: {
      Authorization: `Bearer ${myToken}`,
    },
  });

  return response.data;
};

export const deleteNote = async (noteId: Note["id"]): Promise<Note> => {
  const response = await axios.delete<Note>(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${myToken}`,
    },
  });

  return response.data;
};

export const fetchNoteById = async (noteId: Note["id"]): Promise<Note> => {
  const response = await axios.get<Note>(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${myToken}`,
    },
  });

  return response.data;
};
