/// <reference path="react-image-editor.d.ts" />
import ImageEditor from "@toast-ui/react-image-editor";
import { useEffect, useState } from "react";
import "tui-image-editor/dist/tui-image-editor.css";

const ToastEditor = ({ setPreviewURL, setIsImgAdded }) => {
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

  const handleEnd = () => {
    const lowerCanvas = document.getElementsByClassName("lower-canvas")[0] as HTMLCanvasElement;
    setPreviewURL(lowerCanvas.toDataURL("image/png"));
    console.log('asdf')
    setIsImgAdded(true);
  };

  return (
    <>
      <div onClick={handleEnd}>asdf</div>
      <ImageEditor
        includeUI={{
          loadImage: {
            // path: 'img/sampleImage.jpg',
            name: "SampleImage",
          },
          //   theme: myTheme,
          menu: ["shape", "filter"],
          initMenu: "filter",
          uiSize: {
            width: "1000px",
            height: "700px",
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
    </>
  );
};

export default ToastEditor;
