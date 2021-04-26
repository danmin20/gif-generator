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
        <div
          style={{
            height: "80vh",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button
            className="open-button"
            onClick={() => setIsEditorOpened(true)}
          >
            Open Image Editor
          </button>
        </div>
      ) : (
        !isEditorOpened && (
          <>
            <div style={{ position: "fixed", top: "5rem" }}>
              <button
                className="open-button"
                onClick={() => setIsEditorOpened(true)}
              >
                Change Image
              </button>
            </div>
            <Image {...{ previewURL, setPreviewURL }} />
          </>
        )
      )}
      {isEditorOpened && (
        <ToastEditor {...{ setPreviewURL, setIsImgAdded, setIsEditorOpened }} />
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .open-button {
    margin-top: 3rem;
    padding: 0.5rem 2rem;
    display: flex;
    align-items: center;
    transition: 0.3s;
    :hover {
      font-size: 1.1rem;
      transition: 0.3s;
    }
    ::before {
      width: 2.315rem;
      content: "+";
      font-size: 2rem;
      margin-right: 1rem;
      box-shadow: ${({ theme }) => theme.boxShadow.normal};
      border-radius: 50%;
    }
  }
`;

export default Index;
