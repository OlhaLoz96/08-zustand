"use client";

import css from "./NoteForm.module.css";
import { useMutation } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { NoteFormValues } from "@/types/note";
import { useNoteDraftStore } from "@/lib/store/noteStore";

function NoteForm() {
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      clearDraft();
      toast.success("Note added successfully");
      router.push("/notes/filter/all");
    },
    onError: (error) => {
      console.log("Error", error);
      toast.error("An error occurred");
    },
  });

  const handleSubmit = (formData: FormData) => {
    const values = {
      title: formData.get("title"),
      content: formData.get("content"),
      tag: formData.get("tag"),
    } as NoteFormValues;
    // console.log(values);

    mutation.mutate(values);
  };

  const handleCancel = () => router.back();

  return (
    <>
      <form className={css.form} action={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            name="title"
            className={css.input}
            defaultValue={draft?.title}
            onChange={handleChange}
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
            defaultValue={draft?.content}
            onChange={handleChange}
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <select
            id="tag"
            name="tag"
            className={css.select}
            defaultValue={draft?.tag}
            onChange={handleChange}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </select>
        </div>

        <div className={css.actions}>
          <button
            type="button"
            className={css.cancelButton}
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={css.submitButton}
            disabled={mutation.isPending}
          >
            Create note
          </button>
        </div>
      </form>
      {mutation.isPending && (
        <div
          style={{
            color: "#0d6efd",
            fontSize: "16px",
            textAlign: "center",
          }}
        >
          Adding note ...
        </div>
      )}
    </>
  );
}

export default NoteForm;
