import type { ReactNode } from "react";
import styled from "@emotion/styled";

import { Date } from "./Date";
import { ListItem } from "./ListItem";

interface Props {
  thumbnail: ReactNode;
  title: string;
  description: string;
  period: string;
  url: string;
}

export function Project({ thumbnail, title, description, period, url }: Props) {
  return (
    <ListItem url={url}>
      <ThumbnailWrapper>{thumbnail}</ThumbnailWrapper>

      <ContentWrapper>
        <ProjectTitle>{title}</ProjectTitle>
        <Description>{description}</Description>
        <Date>{period}</Date>
      </ContentWrapper>
    </ListItem>
  );
}

const ThumbnailWrapper = styled.div`
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  width: 192px;
  height: 100px;
  object-fit: cover;
  overflow: hidden;
  transition: transform 0.3s ease;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  @media (max-width: 768px) {
    width: 130px;
    height: 80px;
  }

  @media (max-width: 480px) {
    width: 90px;
    height: 60px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    gap: 8px;
  }

  @media (max-width: 480px) {
    font-size: 0.6rem;
    gap: 5px;
  }
`;

const ProjectTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 20px;
  color: var(--color-text-primary);
`;

const Description = styled.h3`
  color: var(--color-text-secondary);
`;
