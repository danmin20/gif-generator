import ComponentInterface from "./ComponentInterface"
import Color from "./Color"

class Text extends ComponentInterface {
	constructor(fabricObj) {
		super();
		this.color = new Color(fabricObj.fill);
		this.text = fabricObj.text;
		this.position = {
			top:fabricObj.top,
			left:fabricObj.left
		}
		this.font = {
			size:fabricObj.fontSize,
			style:fabricObj.fontStyle,
			weight:fabricObj.fontWeight,
			family:fabricObj.fontFamily
		}
	}
}

export default Text