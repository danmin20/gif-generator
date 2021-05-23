class Color {
  constructor(colorData) {
    if (colorData[0] == "#") {
      this.r = parseInt(colorData.substring(1, 3), 16);
      this.g = parseInt(colorData.substring(3, 5), 16);
      this.b = parseInt(colorData.substring(5, 7), 16);
      this.a = 1;
    } else {
      const rgba = colorData.substring(5, colorData.length - 1).split(",");
      this.r = parseInt(rgba[0]);
      this.g = parseInt(rgba[1]);
      this.b = parseInt(rgba[2]);
      this.a = parseFloat(rgba[3]);
    }
  }

  getColorCode() {
    return `#${this.r.toString(16)}${this.g.toString(16)}${this.b.toString(
      16
    )}`;
  }

  getRgba() {
    return `rgba(${this.r},${this.g},${this.b},${this.a})`;
  }
}

export default Color;
