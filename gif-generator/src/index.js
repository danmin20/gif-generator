import GIF from "gifencoder";
import { fabric } from "fabric";
import Component from "./components";

class GifGenerator {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = canvas.getWidth();
    this.height = canvas.getHeight();
    this.gif = new GIF(this.width, this.height);

    this.gif.start();
    this.gif.setTransparent(null);
    this.gif.setRepeat(0);
    this.gif.setQuality(10);
  }

  _addFrame(delay = 0) {
    this.gif.setDelay(delay);
    this.gif.addFrame(this.canvas.getContext());
  }

  _render() {
    this.gif.finish();
    const byte = new Uint8Array(this.gif.out.data);

    return new Blob([byte], { type: "image/gif" });
  }

  make() {
    const fabricObjs = this.canvas.getObjects();
    const objs = [];

    fabricObjs.map((fabricObj) => {
      if (fabricObj instanceof fabric.Path) {
        objs.push(new Component.Brush(fabricObj));
        this.canvas.remove(fabricObj);
      } else if (fabricObj.text !== undefined) {
        objs.push(new Component.Text(fabricObj));
        this.canvas.remove(fabricObj);
      }
    });

    if (objs.length > 0) {
      let objIdx = 0;
      let isAddMode = true;
      const draw = () => {
        const obj = objs[objIdx];
        if (isAddMode) {
          const fabricObj = obj.getCurrentFabricObject();
          obj.next();
          if (obj.end()) {
            if (objIdx < objs.length - 1) objIdx++;
            else this.canvas.off("after:render", draw);
          } else {
            isAddMode = false;
          }
          this.canvas.add(fabricObj);
        } else {
          this.canvas.remove(
            this.canvas._objects[this.canvas._objects.length - 1]
          );
          isAddMode = true;
        }
      };
      this.canvas.on("after:render", draw);
      draw();
    }

    console.log(objs);
  }
}

window.GifGenerator = GifGenerator;
