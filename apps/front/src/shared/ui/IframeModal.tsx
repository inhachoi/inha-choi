import styled from "@emotion/styled";
import { createPortal } from "react-dom";

interface Props {
  url: string;
  onClose: () => void;
}

export function IframeModal({ url, onClose }: Props) {
  return createPortal(
    <Overlay onClick={onClose}>
      <Iframe src={url} onClick={(e) => e.stopPropagation()} />
    </Overlay>,
    document.body,
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
