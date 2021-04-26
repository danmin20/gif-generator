import GIF from "gifencoder";

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

  addFrame(delay = 0) {
    this.gif.setDelay(delay);
    this.gif.addFrame(this.canvas.getContext());
  }

  render() {
    this.gif.finish();
    const byte = new Uint8Array(this.gif.out.data);

    return new Blob([byte], { type: "image/gif" });
  }
}

window.GifGenerator = GifGenerator;
