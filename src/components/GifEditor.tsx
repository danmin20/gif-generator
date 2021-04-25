import { useEffect, useState } from "react";
import { fabric } from "fabric";
import styled from "styled-components";

const GifEditor = ({ previewURL }) => {
  const [canvas, setCanvas] = useState<HTMLCanvasElement>();

  useEffect(() => {
    if (window) {
      setCanvas(document.getElementById("gif-canvas") as HTMLCanvasElement);
    }
  }, []);

  useEffect(() => {
    // const img = lowerCanvas?.toDataURL("image/png");
    // const uploaded = document.getElementById("image");
    // console.log(uploaded);
    // let w = window.open();
    // if (w?.window) w.document.body.innerHTML = "<img src='" + img + "'>";
    const image = new Image();
    // image.onload = function () {
    //   lowerCanvas.width = uploaded.clientWidth;
    //   lowerCanvas.height = uploaded.clientHeight;
    //   lowerCanvas?.getContext("2d").drawImage(image, 0, 0);
    // };
    console.log("fdasdafs", previewURL);
    image.src = previewURL;
    console.log("canvas", canvas);
    if (canvas?.getContext) {
      image.onload = function () {
        canvas.width = 1000;
        canvas.height = 572;
        canvas?.getContext("2d").drawImage(image, 0, 0);
      };
      console.log(canvas.getContext("2d"));
    }
  }, [canvas]);

  return (
    <Container>
      <ImgBox>
        <canvas id="gif-canvas" />
      </ImgBox>
    </Container>
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
