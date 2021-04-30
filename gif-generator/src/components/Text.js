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
      top: fabricObj.top,
      left: fabricObj.left,
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
