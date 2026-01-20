import styled from "@emotion/styled";

interface Props {
  url: string;
  isOpen: boolean;
  onClose: () => void;
}

export function IframeModal({ url, isOpen, onClose }: Props) {
  return (
    isOpen && (
      <Overlay onClick={onClose}>
        <Content onClick={(e) => e.stopPropagation()}>
          <Iframe src={url} />
          <CloseButton onClick={onClose}>×</CloseButton>
        </Content>
      </Overlay>
    )
  );
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Content = styled.div`
  position: relative;
  width: 90%;
  height: 85%;
  max-width: 1200px;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 12px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: -3.725%;
  right: 0;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: white;
  font-size: 3rem;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }

  @media (max-width: 480px) {
    font-size: 2.5rem;
  }
`;
