import styled from "@emotion/styled";
import { useNavigate } from "@tanstack/react-router";

import { logo } from "../assets";

export function LogoButton() {
  const navigate = useNavigate();
  
  return (
    <Img
      src={logo}
      alt="홈페이지 로고"
      onClick={() => navigate({ to: "/" })}
      loading="lazy"
    />
  );
}

const Img = styled.img`
  cursor: pointer;
  width: 40px;

  @media (max-width: 768px) {
    width: 35px;
  }

  @media (max-width: 480px) {
    width: 30px;
  }
`;
