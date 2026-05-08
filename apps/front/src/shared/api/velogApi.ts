import { VELOG_API_URL, VELOG_USERNAME } from "@/shared/config";

export async function fetchVelogPost(slug: string): Promise<{
  title: string;
  thumbnail: string | null;
  short_description: string;
} | null> {
  try {
    const res = await fetch(VELOG_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        operationName: "ReadPost",
        query: `query ReadPost($username: String, $url_slug: String) {
          post(username: $username, url_slug: $url_slug) {
            title
            thumbnail
            short_description
          }
        }`,
        variables: { username: VELOG_USERNAME, url_slug: slug },
      }),
    });
    if (!res.ok) return null;
    const { data } = await res.json();
    return data?.post ?? null;
  } catch {
    return null;
  }
}
