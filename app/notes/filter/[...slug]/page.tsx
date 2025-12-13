import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { Metadata } from "next";
import { NoteTag } from "@/types/note";

type NotesProps = {
  params: Promise<{ slug: [NoteTag | "all"] }>;
};

export async function generateMetadata({
  params,
}: NotesProps): Promise<Metadata> {
  const { slug } = await params;
  const category = slug[0];
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

  return {
    title: `${categoryName} Notes`,
    description: `Here you can view ${categoryName} notes`,
    openGraph: {
      title: `${categoryName} Notes`,
      description: `Here you can view ${categoryName} notes`,
      url: `https://08-zustand-blond-nine.vercel.app/notes/filter/${category}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `${categoryName} Notes`,
        },
      ],
    },
  };
}

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
