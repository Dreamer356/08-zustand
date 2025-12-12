import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchNotesServer } from "../../../../lib/api";
import NotesClient from "./Notes.client";

interface NotesPageProps {
  params: Promise<{
    slug: string[];
  }>;
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}

export default async function NotesPage({ params, searchParams }: NotesPageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const tag = resolvedParams.slug?.[0] || "All";
  const page = parseInt(resolvedSearchParams.page || "1");
  const search = resolvedSearchParams.search || "";

  // Створюємо QueryClient для SSR
  const queryClient = new QueryClient();

  const queryKey = ["notes", { page, search, tag }];

  // Prefetch для серверних даних (вимога ДЗ)
  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () =>
      fetchNotesServer(
        page,
        12,
        search,
        tag === "All" ? undefined : tag
      ),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} page={page} search={search} />
    </HydrationBoundary>
  );
}
