import GIF from "@dhdbstjr98/gif.js";
import { fabric } from "fabric";
import Component from "./components";

export class GifGenerator {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = canvas.getWidth();
    this.height = canvas.getHeight();
    this.events = {};

    this._initializeGif();
  }

  _initializeGif() {
    this.gif = new GIF({
      width: this.width,
      height: this.height,
      transparent: null,
      repeat: 0,
      workers: 8,
      setQuality: 20,
    });

    Object.keys(this.events).map((event) => {
      this.events[event].map((callback) => {
        this.gif.on(event, callback);
      });
    });
  }

  _addFrame(delay = 0) {
    this.gif.addFrame(this.canvas.getContext(), { delay, copy: true });
  }

  _render(callback) {
    this.gif.on("finished", (blob) => {
      callback(blob);
    });
    this.gif.render();
  }

  on(event, callback) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
  }

  make() {
    this._initializeGif();

    const fabricObjs = this.canvas.getObjects();
    const objs = [];

    fabricObjs.map((fabricObj) => {
      if (fabricObj.path !== null) {
        objs.push(new Component.Brush(fabricObj));
        this.canvas.remove(fabricObj);
      } else if (fabricObj.text !== null) {
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
                this._render(resolve);
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
