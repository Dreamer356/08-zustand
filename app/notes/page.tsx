import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { fetchNotesServer } from '@/lib/api'
import NotesClient from './filter/[...slug]/Notes.client'

export default async function NotesPage() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['notes', { page: 1, search: '', tag: 'All' }],
    queryFn: () => fetchNotesServer(1, 12, '', undefined),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag="All" page={1} search="" />
    </HydrationBoundary>
  )
}
