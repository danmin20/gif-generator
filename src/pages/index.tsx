import Header from "components/Header";
import Image from "components/Image";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { useState } from "react";

const ToastEditor = dynamic(() => import("components/ToastEditor"), {
  ssr: false,
});

const Index = () => {
  const [isEditorOpened, setIsEditorOpened] = useState(false);
  const [previewURL, setPreviewURL] = useState<string | ArrayBuffer>("");
  const [isImgAdded, setIsImgAdded] = useState(false);

  return (
    <Container>
      <Header />

      {!isImgAdded ? (
        <button className="open-button" onClick={() => setIsEditorOpened(true)}>
          asdf
        </button>
      ) : (
        <Image {...{ previewURL, setPreviewURL }} />
      )}
      {isEditorOpened && !isImgAdded && (
        <ToastEditor {...{ setPreviewURL, setIsImgAdded }} />
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .open-button {
  }
`;

export default Index;
