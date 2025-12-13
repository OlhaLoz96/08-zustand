import css from "./Home.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not Found",
  description: "This page does not exist",
  openGraph: {
    title: "Not Found",
    description: "This page does not exist",
    url: `https://08-zustand-blond-nine.vercel.app/notes`,
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Not Found",
      },
    ],
  },
};

function NotFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
}

export default NotFound;
