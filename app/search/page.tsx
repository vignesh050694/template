import { SearchResultsView } from "@/components/search-results-view"

export default function SearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const query = (searchParams.q as string) || ""

  return <SearchResultsView initialQuery={query} />
}
