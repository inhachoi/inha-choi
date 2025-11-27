import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

export function Logo() {
  const navigate = useNavigate();
  return (
    <Img
      src="../../public/choi.png"
      alt="홈페이지 로고"
      onClick={() => navigate("/")}
    />
  );
}

const Img = styled.img`
  cursor: pointer;
  width: 40px;
`;
