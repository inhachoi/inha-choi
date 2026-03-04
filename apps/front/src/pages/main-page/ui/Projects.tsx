import { useState } from "react";
import styled from "@emotion/styled";

import { Project, Skeleton, Title } from "@/shared/ui";

import { PROJECTS } from "../config";

function ProjectThumbnail({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <ThumbnailContainer>
      {!loaded && <Skeleton width="100%" height="100%" borderRadius="0" />}
      <ThumbnailImg
        src={src}
        alt={alt}
        width={192}
        height={100}
        loading="lazy"
        loaded={loaded}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
      />
    </ThumbnailContainer>
  );
}

export function Projects() {
  return (
    <Container>
      <Title>Projects</Title>

      {PROJECTS.map((data) => (
        <Project
          key={data.url}
          thumbnail={<ProjectThumbnail src={data.src} alt={data.alt} />}
          title={data.title}
          description={data.description}
          period={data.period}
          url={data.url}
        />
      ))}
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
  margin: 20px 0px;

  @media (max-width: 768px) {
    gap: 17.5px;
  }

  @media (max-width: 480px) {
    gap: 15px;
  }
`;

const ThumbnailContainer = styled.div`
  position: relative;
  width: 192px;
  height: 100px;
  overflow: hidden;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 130px;
    height: 80px;
  }

  @media (max-width: 480px) {
    width: 90px;
    height: 60px;
  }
`;

const ThumbnailImg = styled.img<{ loaded: boolean }>`
  position: ${({ loaded }) => (loaded ? "static" : "absolute")};
  opacity: ${({ loaded }) => (loaded ? 1 : 0)};
  transition: opacity 0.3s ease, transform 0.3s ease;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
