/// <reference path="react-image-editor.d.ts" />
import ImageEditor from "@toast-ui/react-image-editor";
import { useEffect, useState } from "react";
import "tui-image-editor/dist/tui-image-editor.css";

const ToastEditor = () => {
  const [lowerCanvas, setLowerCanvas] = useState<HTMLCanvasElement>();
  // console.log(
  //   document.getElementsByClassName("lower-canvas")[0]?.toDataURL("image/png")
  // );
  console.log("c");

  // const [upperCanvas, setUpperCanvas] = useState(
  //   document.getElementsByClassName("upper-canvas ")[0]
  // );

  useEffect(() => {
    window?.addEventListener("click", () => {
      setLowerCanvas(
        document.getElementsByClassName("lower-canvas")[0] as HTMLCanvasElement
      );
    });
  }, []);

  useEffect(() => {
    const img = lowerCanvas?.toDataURL("image/png");
    let w = window.open();
    if (w?.window) w.document.body.innerHTML = "<img src='" + img + "'>";

    console.log("b");
    if (lowerCanvas?.getContext) {
      console.log(lowerCanvas.getContext("2d"));
    }
  }, [lowerCanvas?.toDataURL("image/png")]);

  return (
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
  );
};

export default ToastEditor;
