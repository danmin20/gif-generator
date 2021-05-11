/// <reference path="react-image-editor.d.ts" />
import ImageEditor from "@toast-ui/react-image-editor";
import { useEffect, useState } from "react";
import styled from "styled-components";
import "tui-image-editor/dist/tui-image-editor.css";
import { GifGenerator } from "gif-generator/src/index";

const ToastEditor = ({ setPreviewURL, setIsImgAdded, setIsEditorOpened }) => {
  // const [lowerCanvas, setLowerCanvas] = useState<HTMLCanvasElement>();
  // const [upperCanvas, setUpperCanvas] = useState<HTMLCanvasElement>();
  // // console.log(
  // //   document.getElementsByClassName("lower-canvas")[0]?.toDataURL("image/png")
  // // );
  // console.log("s");

  // // const [upperCanvas, setUpperCanvas] = useState(
  // //   document.getElementsByClassName("upper-canvas ")[0]
  // // );

  // useEffect(() => {
  //   window?.addEventListener("click", () => {
  //     setLowerCanvas(
  //       document.getElementsByClassName("lower-canvas")[0] as HTMLCanvasElement
  //     );
  //     setUpperCanvas(
  //       document.getElementsByClassName("upper-canvas")[0] as HTMLCanvasElement
  //     );
  //   });
  // }, []);

  // useEffect(() => {
  //   const img = lowerCanvas?.toDataURL("image/png");
  //   const uploaded = document.getElementById("image");
  //   console.log(uploaded);
  //   // let w = window.open();
  //   // if (w?.window) w.document.body.innerHTML = "<img src='" + img + "'>";
  //   const image = new Image();
  //   // image.onload = function () {
  //   //   lowerCanvas.width = uploaded.clientWidth;
  //   //   lowerCanvas.height = uploaded.clientHeight;
  //   //   lowerCanvas?.getContext("2d").drawImage(image, 0, 0);
  //   // };
  //   image.src = previewURL;
  //   console.log("b");
  //   if (lowerCanvas?.getContext&&upperCanvas?.getContext) {
  //     image.onload = function () {

  //       lowerCanvas.width = 1000;
  //       lowerCanvas.height = 572;
  //       upperCanvas.width = 1000;
  //       upperCanvas.height = 572;
  //       lowerCanvas?.getContext("2d").drawImage(image, 0, 0);
  //     };
  //     console.log(lowerCanvas.getContext("2d"));
  //   }
  // }, [lowerCanvas?.toDataURL("image/png")]);

  const [alertIsShown, setAlertIsShown] = useState(false);

  const handleEnd = () => {
    const lowerCanvas = document.getElementsByClassName(
      "lower-canvas"
    )[0] as HTMLCanvasElement;
    if (
      lowerCanvas.toDataURL("image/png") ===
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAEYklEQVR4Xu3UAQkAAAwCwdm/9HI83BLIOdw5AgQIRAQWySkmAQIEzmB5AgIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlACBB1YxAJfjJb2jAAAAAElFTkSuQmCC"
    ) {
      setAlertIsShown(true);
      setTimeout(() => {
        setAlertIsShown(false);
      }, 1000);
    } else {
      setPreviewURL(lowerCanvas.toDataURL("image/png"));
      setIsImgAdded(true);
      setIsEditorOpened(false);
    }
  };

  // console.log('asdf',document
  // .getElementsByClassName("tui-image-editor-container"))

  // window.GifGenerator = GifGenerator;

  // let gifGenerator;
  // setTimeout(function () {
  //   gifGenerator = new GifGenerator(
  //     document
  //       .getElementsByClassName("tui-image-editor-container")
  //       ._graphics.getCanvas()
  //   );
  // }, 1000);
  // function render() {
  //   gifGenerator.make().then(
  //     (blob) => {
  //       window.open(window.URL.createObjectURL(blob));
  //     },
  //     (error) => {
  //       alert(error);
  //     }
  //   );
  // }

  return (
    <Container>
      <div onClick={handleEnd} className="upload">
        Upload
      </div>
      <ImageEditor
        includeUI={{
          loadImage: {
            // path: 'img/sampleImage.jpg',
            name: "SampleImage",
          },
          //   theme: myTheme,
          initMenu: "filter",
          uiSize: {
            width: "100%",
            height: "600px",
          },
          menuBarPosition: "bottom",
        }}
        cssMaxHeight={500}
        cssMaxWidth={700}
        selectionStyle={{
          cornerSize: 20,
          rotatingPointOffset: 70,
        }}
        usageStatistics={true}
      />
      <div className="alert" style={{ opacity: alertIsShown ? 1 : 0 }}>
        Please select a photo.
      </div>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  width: 90%;
  top: 10rem;
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

export default ToastEditor;
