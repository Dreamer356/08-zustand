import type { Metadata } from 'next';
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { fetchNoteById } from "../../../lib/api";
import NotePreview from "../../@modal/(.)notes/[id]/NotePreview.client";

/* =======================
   SEO — generateMetadata
   ======================= */

interface MetadataProps {
  params: {
    id: string;
  };
}

export async function generateMetadata(
  { params }: MetadataProps
): Promise<Metadata> {
  try {
    const note = await fetchNoteById(params.id);

    const title = `${note.title} | NoteHub`;
    const description =
      note.content.length > 150
        ? note.content.slice(0, 150) + '…'
        : note.content;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `https://notehub.vercel.app/notes/${params.id}`,
        images: [
          {
            url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          },
        ],
      },
    };
  } catch {
    return {
      title: 'Note not found | NoteHub',
      description: 'The requested note does not exist',
    };
  }
}

/* =======================
   Page (SSR + Hydration)
   ======================= */

interface NotePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function NotePage({ params }: NotePageProps) {
  const queryClient = new QueryClient();
  const resolvedParams = await params;

  await queryClient.prefetchQuery({
    queryKey: ["note", resolvedParams.id],
    queryFn: () => fetchNoteById(resolvedParams.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview id={resolvedParams.id} />
    </HydrationBoundary>
  );
}
