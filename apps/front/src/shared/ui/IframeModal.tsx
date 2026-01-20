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
        <Iframe src={url} onClick={(e) => e.stopPropagation()} />
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

const Iframe = styled.iframe`
  width: 90%;
  height: 90%;
  max-width: 1200px;
  border-radius: 12px;
  overflow: hidden;
`;
