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
      } else if (fabricObj.text !== undefined) {
        objs.push(new Component.Text(fabricObj));
      }
    });

    objs.map((obj) => {
      while (!obj.end()) {
        console.log(obj.getCurrentFabricObject());
        obj.next();
      }
    });

    console.log(objs);
  }
}

window.GifGenerator = GifGenerator;
