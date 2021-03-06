import ComponentInterface from "./ComponentInterface";
import Color from "./Color";
import { fabric } from "fabric";

class Brush extends ComponentInterface {
  constructor(fabricObj) {
    super(fabricObj.path.length);
    this.color = new Color(fabricObj.stroke);
    this.paths = fabricObj.path;
    this.size = fabricObj.strokeWidth;
  }

  getCurrentFabricObject() {
    const paths = this.paths.filter((_, i) => i < this.state.current);
    if (paths.length > 0) {
      const popCount = paths[paths.length - 1].length - 3;
      for (let i = 0; i < popCount; i++) {
        paths[paths.length - 1].pop();
      }
      paths[paths.length - 1][0] = "L";
    }
    return new fabric.Path(paths, {
      stroke: this.color.getRgba(),
      strokeWidth: this.size,
      fill: null,
      strokeLineCap: "round",
      strokeLineJoin: "round",
    });
  }

  next() {
    return this.addState(30);
  }
}

export default Brush;
