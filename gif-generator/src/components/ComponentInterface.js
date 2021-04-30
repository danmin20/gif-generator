class ComponentInterface {
  constructor(maxState) {
    this.state = {
      current: 0,
      max: maxState,
    };
  }

  getCurrentFabricObject() {}

  addState(count = 1) {
    if (this.state.current == this.state.max) {
      this.state.current++;
    } else {
      this.state.current = Math.min(this.state.current + count, this.state.max);
    }
  }

  end() {
    return this.state.current == this.state.max + 1;
  }
}

export default ComponentInterface;
