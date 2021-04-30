import GIF from "gifencoder";
import { fabric } from "fabric";
import Component from "./components";

class GifGenerator {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = canvas.getWidth();
    this.height = canvas.getHeight();

    this._initializeGif();
  }

  _initializeGif() {
    this.gif = new GIF(this.width, this.height);
    this.gif.setTransparent(null);
    this.gif.setRepeat(0);
    this.gif.setQuality(10);
    this.gif.start();
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
    this._initializeGif();

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

    return new Promise((resolve, reject) => {
      if (objs.length > 0) {
        let objIdx = 0;
        let isAddMode = true;
        const draw = () => {
          const obj = objs[objIdx];
          if (isAddMode) {
            const fabricObj = obj.getCurrentFabricObject();
            obj.next();
            isAddMode = false;
            this.canvas.add(fabricObj);
          } else {
            this._addFrame(1);
            isAddMode = true;
            if (obj.end()) {
              if (objIdx < objs.length - 1) {
                objIdx++;
                draw();
              } else {
                this.canvas.off("after:render", draw);
                resolve(this._render());
              }
            } else {
              this.canvas.remove(
                this.canvas._objects[this.canvas._objects.length - 1]
              );
            }
          }
        };
        this.canvas.on("after:render", draw);
        draw();
      } else {
        reject(new Error("no objects"));
      }
    });
  }
}

window.GifGenerator = GifGenerator;
