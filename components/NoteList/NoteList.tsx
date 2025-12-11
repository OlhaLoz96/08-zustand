import { deleteNote } from "@/lib/api";
import type { Note } from "@/types/note";
import css from "./NoteList.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Link from "next/link";

interface NoteListProps {
  notes: Note[];
}

function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("Note deleted successfully");
    },
    onError: (error) => {
      console.log("Error", error);
      toast.error("An error occurred");
    },
  });

  const handleDelete = (id: Note["id"]) => {
    mutation.mutate(id);
  };

  return (
    <ul className={css.list}>
      {
        /* Набір елементів списку нотаток */
        notes.map((note) => (
          <li className={css.listItem} key={note.id}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>
              <Link href={`/notes/${note.id}`} className={css.button}>
                View details
              </Link>
              <button
                onClick={() => handleDelete(note.id)}
                className={css.button}
              >
                Delete
              </button>
            </div>
          </li>
        ))
      }
    </ul>
  );
}

export default NoteList;
