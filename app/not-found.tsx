import type { Metadata } from 'next';
import Link from 'next/link';

import css from './not-found.module.css';

export const metadata: Metadata = {
  title: 'Page not found | NoteHub',
  description: 'The page you are looking for does not exist in NoteHub',
  openGraph: {
    title: 'Page not found | NoteHub',
    description: 'The page you are looking for does not exist in NoteHub',
    url: 'https://notehub.vercel.app/not-found',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      },
    ],
  },
};

export default function NotFound() {
  return (
    <main className={css.container}>
      <h1 className={css.title}>404 — Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>

      <Link href="/" className={css.link}>
        Go to home page
      </Link>
    </main>
  );
}
