import { Title, ListItem } from "../components";
import styled from "@emotion/styled";

export function RecentStudy() {
  return (
    <Container>
      <Title>Recent Study</Title>
      <ListItem>Study 1</ListItem>
      <ListItem>Study 2</ListItem>
      <ListItem>Study 3</ListItem>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;
  gap: 10px;
  margin: 20px 0px 100px 0px;
`;
