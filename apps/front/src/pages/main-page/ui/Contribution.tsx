import styled from "@emotion/styled";

import { Date, TextLink, Title } from "@/shared/ui";

import { OPEN_SOURCE_CONTRIBUTION } from "../config/constants";

export function Contribution() {
  return (
    <Container>
      <Title>Open Source Contribution</Title>

      {OPEN_SOURCE_CONTRIBUTION.map((data) => (
        <TextLink key={data.url} to={data.url}>
          <IconWrapper>
            <data.icon aria-hidden="true" />
          </IconWrapper>
          {data.content}
          <Date>{data.date}</Date>
        </TextLink>
      ))}
    </Container>
  );
}

const IconWrapper = styled.div`
  display: flex;
  flex-shrink: 0;

  svg {
    width: 40px;
    height: 40px;
  }

  @media (max-width: 768px) {
    svg {
      width: 32.5px;
      height: 32.5px;
    }
  }

  @media (max-width: 480px) {
    svg {
      width: 25px;
      height: 25px;
    }
  }
`;

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
