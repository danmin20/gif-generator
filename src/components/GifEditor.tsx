import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import TuiImageEditor from "tui-image-editor";
import "gif-generator/dist/gif-generator";
import { postGif } from "api";

declare global {
  interface Window {
    GifGenerator: any;
  }
}

const GifEditor = ({ previewURL }) => {
  const [imageEditor, setImageEditor] = useState(null);

  const rootEl = useRef();

  const [download, setDownload] = useState(null);
  const [blob, setBlob] = useState(null);

  useEffect(() => {
    if (window) {
      setImageEditor(
        new TuiImageEditor(rootEl.current, {
          includeUI: {
            loadImage: {
              path: previewURL,
              name: "SampleImage",
            },
            uiSize: {
              width: "100%",
              height: "600px",
            },
            initMenu: "filter",
            menuBarPosition: "bottom",
          },
          cssMaxWidth: 500,
          cssMaxHeight: 700,
          usageStatistics: false,
        })
      );
    }
  }, []);

  useEffect(() => {
    if (imageEditor) {
      console.log(imageEditor._graphics.getCanvas().getObjects());
    }
  }, [imageEditor]);

  const render = () => {
    console.log("aaa", imageEditor._graphics.getCanvas().getObjects());
    const gifGenerator = new window.GifGenerator(
      imageEditor._graphics.getCanvas()
    );
    gifGenerator.make().then(
      (blob) => {
        setBlob(blob);
        console.log("blobaaa", blob);
        // console.log(window.URL.createObjectURL(blob));
        setDownload(window.URL.createObjectURL(blob));
      },
      (error) => {
        alert(error);
      }
    );
  };

  const handleUpload = async () => {
    const file = new File([blob], "file.gif");
    const formData = new FormData();
    formData.append("gif", file);
    const res = await postGif(formData);
    console.log(res);
  };

  return (
    <>
      <Wrapper>
        {download && (
          <div style={{ display: "flex" }}>
            <a href={download} download="new_file_name.gif">
              download
            </a>
            <div onClick={handleUpload}>server upload</div>
          </div>
        )}
        <div onClick={render} className="upload">
          Save
        </div>
        <div ref={rootEl} />
        <div className="alert">Please select a photo.</div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  position: fixed;
  width: 90%;
  top: 15rem;
  border-radius: 1.5rem;
  box-shadow: ${({ theme }) => theme.boxShadow.normal};
  display: flex;
  flex-direction: column;
  align-items: center;
  .upload {
    font: 800 11.5px Arial;
    position: absolute;
    right: 0;
    top: 0;
    width: 120px;
    height: 40px;
    background: red;
    z-index: 10;
    border-radius: 20px;
    margin: 8px;
    background-color: #fdba3b;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .alert {
    position: fixed;
    border-radius: 0.5rem;
    transition: 1s;
    top: 7rem;
  }
  .tui-image-editor-container {
    border-radius: 1.5rem;
  }
  .tui-image-editor-container .tui-image-editor-help-menu.top {
    left: 19rem;
    top: 1rem;
  }
  .tui-image-editor-header-logo {
    display: none;
  }
`;

export default GifEditor;
