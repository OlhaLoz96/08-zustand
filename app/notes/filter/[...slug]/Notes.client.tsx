"use client";

import { useState } from "react";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import { Toaster } from "react-hot-toast";
import SearchBox from "@/components/SearchBox/SearchBox";
import { useDebouncedCallback } from "use-debounce";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import css from "./NotesPage.module.css";
import { fetchNotes } from "@/lib/api";
import { NoteTag } from "@/types/note";

interface NotesClientProps {
  category: NoteTag | undefined;
}

function NotesClient({ category }: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const updateSearchQuery = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
      setCurrentPage(1);
    },
    300
  );

  const { data, error, isLoading, isError, isSuccess } = useQuery({
    queryKey: [
      "notes",
      { searchQuery: searchQuery, page: currentPage, category: category },
    ],
    queryFn: () => fetchNotes(searchQuery, currentPage, category),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const totalPages = data?.totalPages ?? 0;

  // useEffect(() => {
  //   if (data && data.notes.length === 0) {
  //     toast.error("No notes found for your request.");
  //   }
  // }, [data]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main className={css.app}>
      <Toaster />
      <header className={css.toolbar}>
        <SearchBox inputValue={searchQuery} onChange={updateSearchQuery} />
        {isSuccess && totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      {isLoading && <Loader />}
      {isError && <ErrorMessage errorInfo={error} />}
      {data && data.notes.length === 0 && (
        <p
          style={{
            color: "red",
            fontSize: "18px",
            padding: "20px",
            textAlign: "center",
          }}
        >
          No notes found for your request.
        </p>
      )}
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />{" "}
        </Modal>
      )}
    </main>
  );
}

export default NotesClient;
