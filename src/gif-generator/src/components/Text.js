import ComponentInterface from "./ComponentInterface";
import Color from "./Color";
import Hangul from "hangul-js";
import { fabric } from "fabric";

class Text extends ComponentInterface {
  constructor(fabricObj) {
    const textSplited = Hangul.disassemble(fabricObj.text);

    super(textSplited.length);
    this.color = new Color(fabricObj.fill);
    this.text = {
      plain: fabricObj.text,
      splited: textSplited,
    };
    this.position = {
      top:
        fabricObj.originY == "center"
          ? fabricObj.top - fabricObj.height / 2
          : fabricObj.top,
      left:
        fabricObj.originX == "center"
          ? fabricObj.left - fabricObj.width / 2
          : fabricObj.left,
    };
    this.font = {
      size: fabricObj.fontSize,
      style: fabricObj.fontStyle,
      weight: fabricObj.fontWeight,
      family: fabricObj.fontFamily,
    };
  }

  getCurrentFabricObject() {
    return new fabric.Text(
      Hangul.assemble(
        this.text.splited.filter((_, i) => i < this.state.current)
      ),
      {
        top: this.position.top,
        left: this.position.left,
        originX: "left",
        originY: "top",
        fontFamily: this.font.family,
        fontSize: this.font.size,
        fontWeight: this.font.weight,
        fontStyle: this.font.style,
        fill: this.color.getColorCode(),
      }
    );
  }

  next() {
    return this.addState();
  }
}

export default Text;
