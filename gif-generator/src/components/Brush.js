import ComponentInterface from "./ComponentInterface"
import Color from "./Color"

class Brush extends ComponentInterface {
	constructor(fabricObj) {
		super();
		this.color = new Color(fabricObj.stroke);
		this.paths = fabricObj.path;
		this.size = fabricObj.strokeWidth;
	}
}

export default Brush