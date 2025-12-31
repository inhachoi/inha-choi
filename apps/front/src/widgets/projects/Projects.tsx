import styled from "@emotion/styled";
import { inhachoi, dongnaebangnae, boolock } from "@/shared/assets";
import { Title, Project } from "@/shared/ui";
import {
  REPO_DONGNAEBANGNAE_URL,
  REPO_BOOLOCK_URL,
  REPO_INHACHOI_URL,
} from "@/shared/lib/constants";

export function Projects() {
  return (
    <Container>
      <Title>Projects</Title>

      <Project
        thumbnail={
          <img
            src={inhachoi}
            alt="개발자 최경일 프로젝트 썸네일 사진"
            loading="lazy"
          />
        }
        title="개발자 최경일"
        description="개인 홈페이지 1인 프로젝트!"
        period="25.11 ~ "
        url={REPO_INHACHOI_URL}
      />

      <Project
        thumbnail={
          <img
            src={boolock}
            alt="BooLock 프로젝트 썸네일 사진"
            loading="lazy"
          />
        }
        title="BooLock"
        description="HTML과 CSS를 블록으로 쉽게 익히는 블록코딩 플랫폼!"
        period="24.10 ~ 25.01"
        url={REPO_BOOLOCK_URL}
      />

      <Project
        thumbnail={
          <img
            src={dongnaebangnae}
            alt="동네방네 프로젝트 썸네일 사진"
            loading="lazy"
          />
        }
        title="동네방네"
        description="동네와 주민들에 대한 유대감을 증대시키주는 SNS!"
        period="24.03 ~ 24.05"
        url={REPO_DONGNAEBANGNAE_URL}
      />
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
