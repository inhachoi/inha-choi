export async function fetchInfinitePosts({
  pageParam = null,
}: {
  pageParam?: string | null;
}) {
  const url = pageParam ? `/api/posts?cursor=${pageParam}` : `/api/posts`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("failed to fetch posts");

  return res.json();
}
