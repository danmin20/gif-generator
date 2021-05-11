import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import styled from "styled-components";
import { GifGenerator } from "gif-generator/src";
import ImageEditor from "@toast-ui/react-image-editor";

const GifEditor = ({ previewURL }) => {
  const [canvas, setCanvas] = useState<HTMLCanvasElement>();
  const [gifGenerator, setGifGenerator] = useState(null);

  useEffect(() => {
    if (window) {
      setCanvas(
        document.getElementsByClassName(
          "tui-image-editor-container"
        )[0] as HTMLCanvasElement
      );
    }
  }, []);
  console.log(
    "asdf",
    document.getElementsByClassName("tui-image-editor-container")
  );
  console.log("canvas", canvas);
  console.log('useref',useRef.arguments)

  useEffect(()=>{
    if(canvas)setGifGenerator(new GifGenerator(canvas._graphics.getCanvas()));
  }, [canvas])

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
  //     console.log('왜안돼')
  //     image.onload = function () {
  //       canvas.width = 1000;
  //       canvas.height = 572;
  //       canvas?.getContext("2d").drawImage(image, 0, 0);
  //     };
  //     // console.log(canvas.getContext("2d"));
  //   }
  // }, [canvas]);

  const render = () => {
    gifGenerator.make().then(
      (blob) => {
        window.open(window.URL.createObjectURL(blob));
      },
      (error) => {
        alert(error);
      }
    );
  };

  return (
    <Container>
      <div onClick={render} className="upload">
        Save
      </div>
      <ImageEditor
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
      />
      <div className="alert">Please select a photo.</div>
    </Container>
    // <Container>
    //   <ImgBox>
    //     <canvas id="gif-canvas" />
    //   </ImgBox>
    // </Container>
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

export default GifEditor;
