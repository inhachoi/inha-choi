import styled from "@emotion/styled";
import { Title, Article } from "../components";
import { useState, useEffect } from "react";

type Post = {
  title: string;
  link: string;
  thumbnail: string;
  likes: number;
  description: string;
};

export function PopularPosts() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setPosts(data.posts ?? []);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const top3Posts = [...posts].sort((a, b) => b.likes - a.likes).slice(0, 3);

  return (
    <Container>
      <Title>Popular Posts</Title>
      {top3Posts.map((post) => (
        <Article
          key={post.link}
          title={post.title}
          link={post.link}
          thumbnail={post.thumbnail}
          likes={post.likes}
        />
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;
  gap: 10px;
`;
