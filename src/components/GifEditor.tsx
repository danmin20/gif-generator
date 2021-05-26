import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import TuiImageEditor from "tui-image-editor";
import "gif-generator/dist/gif-generator";
import { postGif } from "api";
import Close from "public/close.svg";
import Copy from "public/copy.svg";

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

  const [unableToUpload, setUnableToUpload] = useState(false);
  const [isModalOpened, setIsModalOpened] = useState(false);

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
        if (blob.size > 5000000) setUnableToUpload(true);
        setDownload(window.URL.createObjectURL(blob));
        setIsModalOpened(true);
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
    setViewLink(`https://gif-generator.bu.to/${res.id}`);
  };

  const handleCloseModal = () => {
    setIsModalOpened(false);
    setIsMakeStarted(false);
    setDownload(null);
    setPercent(0);
    setViewLink(null);
  };

  const clipboardCopy = (text: string) => {
    if (!document.queryCommandSupported("copy")) {
      return alert("클립보드가 지원되지 않는 브라우저입니다.");
    }
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    // 사파리 브라우저 서포팅
    textarea.focus();
    // 사용자가 입력한 내용을 영역을 설정할 때 필요
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);

    return null;
  };

  return (
    <>
      <Wrapper>
        {((isMakeStarted && !download) || isUploadLoading) && (
          <>
            <div className="background" />
            <div className="modal">
              <div className="download">
                loading... {!isUploadLoading && `${percent}%`}
              </div>
            </div>
          </>
        )}
        {!isUploadLoading && viewLink && (
          <>
            <div className="background" />
            <div className="modal">
              <div className="download">
                <div className="modal__close" onClick={handleCloseModal}>
                  <Close />
                </div>
                <div className="download__explain">Click to Copy the Link!</div>
                <div
                  className="download__copy"
                  onClick={() => clipboardCopy(viewLink)}
                >
                  {viewLink}
                  <div style={{ marginLeft: "0.5rem" }}>
                    <Copy />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {download && !isUploadLoading && isModalOpened && !viewLink && (
          <NextStepModal
            {...{
              unableToUpload,
              download,
              handleUpload,
              blob,
              handleCloseModal,
            }}
          />
        )}
        <div onClick={makeGif} className="make">
          Make a Gif
        </div>
        <div ref={rootEl} />
      </Wrapper>
    </>
  );
};

const NextStepModal = ({
  unableToUpload,
  download,
  handleUpload,
  blob,
  handleCloseModal,
}) => {
  const url = window.URL.createObjectURL(blob);
  return (
    <ModalWrapper {...{ unableToUpload }}>
      <div className="background" />
      <div className="modal">
        <div className="download">
          <div className="modal__close" onClick={handleCloseModal}>
            <Close />
          </div>
          <img src={url} width={500} />
          <div className="buttons">
            <div className="buttons__btn">
              <a href={download} download="new_gif.gif">
                Download a File
              </a>
            </div>
            <div className="buttons__btn">
              <div onClick={!unableToUpload && handleUpload}>
                Upload to Server
              </div>
            </div>
          </div>
          {unableToUpload && (
            <div className="warning">5MB 미만만 업로드 가능합니다!</div>
          )}
        </div>
      </div>
    </ModalWrapper>
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
  .modal {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    &__close {
      cursor: pointer;
      position: absolute;
      width: 2.5rem;
      height: 2.5rem;
      background: white;
      border-radius: 50%;
      box-shadow: ${({ theme }) => theme.boxShadow.normal};
      display: flex;
      align-items: center;
      justify-content: center;
      right: -0.7rem;
      top: -0.7rem;
      z-index: 103;
    }
  }
  .download {
    position: absolute;
    z-index: 100;
    background-color: white;
    padding: 1.5rem 2rem;
    border-radius: 2rem;
    &__explain {
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
      font-weight: 800;
    }
    &__copy {
      cursor: pointer;
      display: flex;
      align-items: center;
      :hover {
        text-decoration: underline;
      }
    }
  }
  a {
    color: black;
    text-decoration: none;
  }
  .unable {
    cursor: not-allowed;
    opacity: 0.5;
  }
  .make {
    font: 800 11.5px Arial;
    position: absolute;
    left: 0;
    top: 0;
    width: 120px;
    height: 40px;
    z-index: 10;
    border-radius: 20px;
    margin: 8px;
    background-color: #fdba3b;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    :hover {
      text-decoration: underline;
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
  .tui-image-editor-help-menu {
    display: none;
  }
`;

const ModalWrapper = styled.div<{ unableToUpload: boolean }>`
  .download {
    position: absolute;
    z-index: 100;
    background-color: white;
    padding: 1.5rem 2rem;
    border-radius: 2rem;
  }
  .warning {
    box-sizing: border-box;
    padding-right: 1rem;
    width: 100%;
    text-align: end;
    margin-top: 1rem;
  }
  .buttons {
    display: flex;
    flex: 1;
    margin-top: 1rem;
    &__btn {
      flex: 0.5;
      text-align: center;
      cursor: pointer;
      border-radius: 2rem;
      padding: 1.5rem;
      background-color: #fdba3b;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      :hover {
        text-decoration: underline;
      }
      :last-child {
        margin-left: 1rem;
        cursor: ${({ unableToUpload }) =>
          unableToUpload ? "not-allowed" : "pointer"};
        :hover {
          text-decoration: ${({ unableToUpload }) =>
            !unableToUpload ? "underline" : "none"};
        }
        opacity: ${({ unableToUpload }) => unableToUpload && 0.5};
      }
    }
  }
`;

export default GifEditor;
