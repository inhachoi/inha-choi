import { Title, TextLink, Date } from "@/shared/ui";
import styled from "@emotion/styled";

import { OPEN_SOURCE_CONTRIBUTION } from "../config/constants";

export function Contribution() {
  return (
    <Container>
      <Title>Open Source Contribution</Title>

      {OPEN_SOURCE_CONTRIBUTION.map((data) => (
        <TextLink to={data.url}>
          <Img src={data.src} />
          {data.content}
          <Date>{data.date}</Date>
        </TextLink>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
  margin: 20px 0 100px 0;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    margin: 20px 0 80px 0;
  }

  @media (max-width: 480px) {
    font-size: 0.6rem;
    margin: 20px 0 60px 0;
  }
`;

const Img = styled.img`
  width: 40px;

  @media (max-width: 768px) {
    width: 32.5px;
  }

  @media (max-width: 480px) {
    width: 25px;
  }
`;
