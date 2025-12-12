import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import './globals.css';

import QueryProvider from '../components/Providers/QueryProvider';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'NoteHub is a simple and convenient app for managing your notes',
  openGraph: {
    title: 'NoteHub',
    description: 'NoteHub is a simple and convenient app for managing your notes',
    url: 'https://notehub.vercel.app',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal?: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <QueryProvider>
          <Header />
          {children}
          {modal}
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
