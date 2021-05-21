import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import TuiImageEditor from "tui-image-editor";
import "gif-generator/dist/gif-generator";

const GifEditor = ({ previewURL }) => {
  // const [canvas, setCanvas] = useState<HTMLCanvasElement>();
  // const [gifGenerator, setGifGenerator] = useState(null);
  const [imageEditor, setImageEditor] = useState(null);

  const rootEl = useRef();

  useEffect(() => {
    // if (window) {
    //   setCanvas(
    //     document.getElementsByClassName(
    //       "tui-image-editor-container"
    //     )[0] as HTMLCanvasElement
    //   );
    //   console.log(
    //     document.getElementsByClassName(
    //       "tui-image-editor-container"
    //     )[0] as HTMLCanvasElement
    //   );
    // }

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
      // setGifGenerator(new GifGenerator(imageEditor._graphics.getCanvas()));
      console.log(imageEditor._graphics.getCanvas().getObjects());
    }
  }, [imageEditor]);

  const render = () => {
    console.log("aaa", imageEditor._graphics.getCanvas().getObjects());
    const gifGenerator = new GifGenerator(imageEditor._graphics.getCanvas());
    gifGenerator.make().then(
      (blob) => {
        console.log("blob", blob);
        console.log(window.URL.createObjectURL(blob));
        window.open(window.URL.createObjectURL(blob));
      },
      (error) => {
        alert(error);
      }
    );
  };

  // useEffect(() => {
  //   // if (canvas) setGifGenerator(new GifGenerator(canvas._graphics.getCanvas()));
  //   if (canvas) {
  //     console.log("aaaaa", canvas);
  //   }
  // }, [canvas]);

  // useEffect(() => {
  //   if (window) {
  //     setCanvas(document.getElementById("gif-canvas") as HTMLCanvasElement);
  //   }
  // }, []);

  // useEffect(() => {
  //   // const img = lowerCanvas?.toDataURL("image/png");
  //   // const uploaded = document.getElementById("image");
  //   // console.log(uploaded);
  //   // let w = window.open();
  //   // if (w?.window) w.document.body.innerHTML = "<img src='" + img + "'>";
  //   const image = new Image();
  //   // image.onload = function () {
  //   //   lowerCanvas.width = uploaded.clientWidth;
  //   //   lowerCanvas.height = uploaded.clientHeight;
  //   //   lowerCanvas?.getContext("2d").drawImage(image, 0, 0);
  //   // };
  //   image.src = previewURL;
  //   console.log("canvascontext", canvas?.getContext);
  //   if (canvas?.getContext) {
  //     console.log("왜안돼");
  //     image.onload = function () {
  //       canvas.width = 1000;
  //       canvas.height = 572;
  //       canvas?.getContext("2d").drawImage(image, 0, 0);
  //     };
  //     // console.log(canvas.getContext("2d"));
  //   }
  // }, [canvas]);

  return (
    <>
      <Wrapper>
        <div onClick={render} className="upload">
          Save
        </div>
        {/* <ImageEditor
          includeUI={{
            loadImage: {
              path: previewURL,
              name: "SampleImage",
            },
            menu: ["draw", "text"],
            initMenu: "draw",
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
        /> */}
        <div ref={rootEl} />
        <div className="alert">Please select a photo.</div>
      </Wrapper>
      {/* <Container>
        <ImgBox>
          <canvas id="gif-canvas" />
        </ImgBox>
      </Container> */}
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

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10rem;
`;
const ImgBox = styled.div`
  position: relative;
  width: 90%;
  background-color: white;
  box-shadow: ${({ theme }) => theme.boxShadow.normal};
  border-radius: 2rem;
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  display: flex;
  padding: 1rem 0;
`;

export default GifEditor;
