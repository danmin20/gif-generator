import dynamic from "next/dynamic";
import { useState } from "react";
import styled from "styled-components";

const ToastEditor = dynamic(() => import("components/ToastEditor"), {
  ssr: false,
});
const Image = ({ previewURL, setPreviewURL }) => {
  const [file, setFile] = useState(undefined);
  console.log("previewURL", previewURL);

  //   const uploadImage = (file) => {
  //     if (!file) {
  //       return;
  //     }
  //   };

  // const selectImg = (e) => {
  //   const reader = new FileReader();
  //   const targetFile = e.target.files[0];
  //   setFile(targetFile);
  //   // uploadImage(targetFile);

  //   reader.onloadend = () => {
  //     setPreviewURL(reader.result);
  //   };

  //   reader.readAsDataURL(targetFile);
  // };

  // const [isEditorOpened, setIsEditorOpened] = useState(false);
  // const handleEditor = () => {
  //   setIsEditorOpened(true);
  // };

  return (
    <>
      <Container>
        <ImgBox>
          {/* <div onClick={handleEditor}>asdf</div> */}
          {/* {file === undefined ? ( */}
          <>
            {/* <div className="sub-flex">
                <BlankBox />
                <div>Click to add a photo</div>
                <input
                  type="file"
                  style={{
                    position: "absolute",
                    top: 0,
                    paddingLeft: 0,
                    zIndex: 0,
                    width: "90%",
                    height: "100%",
                    border: "none",
                    cursor: "pointer",
                    outline: "none",
                  }}
                  onChange={selectImg}
                />
              </div>
              <div className="sub-flex">Open Image Editor</div> */}
          </>
          {/* ) : ( */}
          <img
            id="image"
            alt={""}
            style={{
              objectFit: "cover",
              display: "flex",
              maxHeight: "90%",
              maxWidth: "90%",
            }}
            src={previewURL as string}
          />
          {/* )} */}
        </ImgBox>
        {/* <Menu /> */}
      </Container>
      {/* {isEditorOpened && <ToastEditor {...{ setPreviewURL, setIsImgAdded }} />} */}
    </>
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
  margin-top: 10rem;
`;
const ImgBox = styled.div`
  position: relative;
  width: 90%;
  /* height: 30rem; */
  background-color: white;
  box-shadow: ${({ theme }) => theme.boxShadow.normal};
  border-radius: 2rem;
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  display: flex;
  /* flex: 0.6; */
  padding: 1rem 0;
  /* .sub-flex {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    :first-child {
      border-right: 1px solid ${({ theme }) => theme.color.gray};
    }
  } */
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
