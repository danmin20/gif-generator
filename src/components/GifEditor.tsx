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
  const [percent, setPercent] = useState(0);

  const [isMakeStarted, setIsMakeStarted] = useState(false);
  const [isUploadLoading, setIsUploadLoading] = useState(false);
  const [viewLink, setViewLink] = useState(null);

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
            menu: ["draw", "text"],
            menuBarPosition: "bottom",
          },
          cssMaxWidth: 500,
          cssMaxHeight: 700,
          usageStatistics: false,
        })
      );
    }
  }, []);

  const makeGif = () => {
    setIsMakeStarted(true);
    const gifGenerator = new window.GifGenerator(
      imageEditor._graphics.getCanvas()
    );
    gifGenerator.on("progress", (p: number) => {
      setPercent(Math.round(p * 100));
    });
    gifGenerator.make().then(
      (blob: Blob) => {
        setBlob(blob);
        setDownload(window.URL.createObjectURL(blob));
      },
      (error) => {
        alert(error);
      }
    );
  };

  const handleUpload = async () => {
    setIsUploadLoading(true);
    const file = new File([blob], "new_gif.gif");
    const formData = new FormData();
    formData.append("gif", file);
    const res = await postGif(formData);

    setIsUploadLoading(false);
    // https://gif-generator.bu.to
    setViewLink(`http://localhost:3000/${res.id}`);
  };

  return (
    <>
      <Wrapper>
        {((isMakeStarted && !download) || isUploadLoading) && (
          <>
            <div className="background" />
            <div className="download">loading... {percent}%</div>
          </>
        )}
        {!isUploadLoading && viewLink && (
          <div className="download" style={{ zIndex: 200 }}>
            <a href={viewLink}>{viewLink}</a>
          </div>
        )}
        {download && !isUploadLoading && (
          <>
            <div className="background" />
            <div className="download">
              <div className="download__btn">
                <a href={download} download="new_gif.gif">
                  Download a File
                </a>
              </div>
              <div className="download__btn">
                <div onClick={handleUpload}>Upload to Server</div>
              </div>
            </div>
          </>
        )}
        <div onClick={makeGif} className="make">
          Make a Gif
        </div>
        <div ref={rootEl} />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  position: fixed;
  width: 90%;
  top: 10rem;
  border-radius: 1.5rem;
  box-shadow: ${({ theme }) => theme.boxShadow.normal};
  display: flex;
  flex-direction: column;
  align-items: center;
  a {
    color: black;
    text-decoration: none;
  }
  .make {
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
  .background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: black;
    opacity: 0.7;
    z-index: 100;
  }
  .download {
    position: absolute;
    top: 15rem;
    z-index: 100;
    display: flex;
    background-color: white;
    padding: 1.5rem 2rem;
    border-radius: 2rem;
    &__btn {
      cursor: pointer;
      :last-child {
        margin-left: 1rem;
      }
    }
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
  .tui-image-editor-header-buttons {
    display: none;
  }
`;

export default GifEditor;
