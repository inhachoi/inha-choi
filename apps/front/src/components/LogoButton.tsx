import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import choi from "../assets/logo.png";

export function LogoButton() {
  const navigate = useNavigate();
  return <Img src={choi} alt="홈페이지 로고" onClick={() => navigate("/")} />;
}

const Img = styled.img`
  cursor: pointer;
  width: 40px;
`;
