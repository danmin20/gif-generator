import { useState } from "react";
import styled from "styled-components";

const Image = () => {
  const [file, setFile] = useState(undefined);
  const [previewURL, setPreviewURL] = useState("");

  //   const uploadImage = (file) => {
  //     if (!file) {
  //       return;
  //     }
  //   };

  const selectImg = (e) => {
    const reader = new FileReader();
    const targetFile = e.target.files[0];
    setFile(targetFile);
    // uploadImage(targetFile);

    reader.onloadend = () => {
      setPreviewURL(reader.result);
    };

    reader.readAsDataURL(targetFile);
  };

  return (
    <Container>
      <ImgBox>
        {file === undefined ? (
          <>
            <BlankBox />
            <div>Click to add a photo</div>
            <input
              type="file"
              style={{
                marginTop: "5px",
                position: "absolute",
                zIndex: 0,
                width: "90%",
                height: "100%",
                border: "none",
                cursor: "pointer",
                outline: "none",
              }}
              onChange={selectImg}
            />
          </>
        ) : (
          <img
            alt={""}
            style={{ objectFit: "cover", display: "flex", margin: "0 auto" }}
            src={previewURL}
          />
        )}
      </ImgBox>
      <Menu />
    </Container>
  );
};

const Menu = () => {
  return (
    <div style={{ width: "15rem", marginLeft: "2rem" }}>
      <Box />
      <Box />
      <Box />
      <Box />
    </div>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const ImgBox = styled.div`
  position: relative;
  width: 40rem;
  height: 30rem;
  background-color: white;
  box-shadow: ${({ theme }) => theme.boxShadow.normal};
  border-radius: 2rem;
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
`;

const Box = styled.div`
  width: 100%;
  height: 10rem;
  margin-top: 2rem;
  border-radius: 1rem;
  background-color: white;
  box-shadow: ${({ theme }) => theme.boxShadow.normal};
`;
const BlankBox = styled.div`
  z-index: 1;
  position: absolute;
  top: 0;
  width: 90%;
  height: 50px;
  background-color: white;
`;

export default Image;
