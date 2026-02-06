import styled from "@emotion/styled";
import { Title, Project } from "@/shared/ui";
import { PROJECTS } from "../config";

export function Projects() {
  return (
    <Container>
      <Title>Projects</Title>

      {PROJECTS.map((data) => (
        <Project
          thumbnail={<img src={data.src} alt={data.alt} loading="lazy" />}
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
