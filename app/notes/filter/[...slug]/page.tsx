import type { Metadata } from 'next';
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { fetchNotesServer } from '../../../../lib/api';
import NotesClient from './Notes.client';

/* =======================
   SEO — generateMetadata
   ======================= */

interface GenerateMetadataProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateMetadata(
  { params }: GenerateMetadataProps
): Promise<Metadata> {
  const resolvedParams = await params;
  const filter = resolvedParams.slug?.[0] ?? 'All';

  const title = `Notes filter: ${filter} | NoteHub`;
  const description = `Viewing notes filtered by ${filter} in NoteHub`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://notehub.vercel.app/notes/filter/${filter}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        },
      ],
    },
  };
}

/* =======================
   Page (SSR + Hydration)
   ======================= */

interface NotesPageProps {
  params: Promise<{
    slug: string[];
  }>;
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}

export default async function NotesPage({
  params,
  searchParams,
}: NotesPageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const tag = resolvedParams.slug?.[0] || 'All';
  const page = Number(resolvedSearchParams.page ?? 1);
  const search = resolvedSearchParams.search ?? '';

  const queryClient = new QueryClient();

  const queryKey = ['notes', { page, search, tag }];

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () =>
      fetchNotesServer(
        page,
        12,
        search,
        tag === 'All' ? undefined : tag
      ),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} page={page} search={search} />
    </HydrationBoundary>
  );
}
