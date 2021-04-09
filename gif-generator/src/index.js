import GIF from "./lib/GIFEncoder";

class GifGenerator {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = canvas.getWidth();
    this.height = canvas.getHeight();
    this.gif = new GIF(this.width, this.height);

    this.gif.writeHeader();
    this.gif.setTransparent(null);
    this.gif.setRepeat(0);
    this.gif.setQuality(10);
    this.gif.setDither(false);
    this.gif.setGlobalPalette(false);
  }

  addFrame(delay = 0) {
    this.gif.setDelay(delay);
    this.gif.addFrame(
      this.canvas.getContext().getImageData(0, 0, this.width, this.height).data
    );
  }

  render() {
    this.gif.finish();
    const stream = this.gif.stream();

    let bytes = [];
    stream.pages.map((page) => {
      bytes = bytes.concat([...page]);
    });
    bytes = new Uint8Array(bytes);

    return new Blob([bytes], { type: "image/gif" });
  }
}

window.GifGenerator = GifGenerator;
