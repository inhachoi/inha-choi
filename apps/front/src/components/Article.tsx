import styled from "@emotion/styled";
import { colors } from "@toss/tds-colors";
import type { ReactNode } from "react";
import velog from "../assets/velog.jpg";

interface ArticleProps {
  children: ReactNode;
}

export function Article({ children }: ArticleProps) {
  return (
    <Container>
      <Thumbnail src={velog} alt="" />
      {children}
    </Container>
  );
}

const Container = styled.article`
  display: flex;
  align-items: center;
  margin: 5px 20px;
  gap: 50px;
  width: 100%;
  height: 100px;
  background: white;
  border-radius: 10px;
  cursor: pointer;
  box-sizing: border-box;
  overflow: hidden;

  transition: transform 0.25 ease, box-shadow 0.25s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);

  &:hover {
    background: ${colors.grey100};
    transform: translateY(-3px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
  }
`;

const Thumbnail = styled.img`
  width: 150px;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
`;
