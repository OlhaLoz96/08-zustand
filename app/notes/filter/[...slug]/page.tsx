import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { Metadata } from "next";
import { NoteTag } from "@/types/note";

export const metadata: Metadata = {
  title: "Notes",
};

type NotesProps = {
  params: Promise<{ slug: [NoteTag | "all"] }>;
};

async function Notes({ params }: NotesProps) {
  const { slug } = await params;
  const category = slug[0] === "all" ? undefined : slug[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", { searchQuery: "", page: 1, category: category }],
    queryFn: () => fetchNotes("", 1, category),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient category={category} />
    </HydrationBoundary>
  );
}

export default Notes;
