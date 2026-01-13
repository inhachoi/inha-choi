import { formatYearMonth } from "@/shared/lib/utils";
import { Article } from "@/shared/ui";
import type { PostType } from "@/shared/model/types";

export const PostsList = ({ posts }: { posts: PostType[] }) => {
  return (
    <>
      {posts.map((post) => (
        <Article
          key={post.link}
          title={post.title}
          link={post.link}
          thumbnail={post.thumbnail}
          likes={post.likes}
          released_at={formatYearMonth(post.released_at)}
        />
      ))}
    </>
  );
};
