const DEFAULT_COLOR = "#5E81AC";
const COMPARED_COLOR = "#A3BE8C";
const SWAPPED_COLOR = "#BF616A";

export default class Item {
  constructor(value) {
    this.value = value;
    this.color = DEFAULT_COLOR;
  }

  getValue() {
    return this.value;
  }
  wasCompared() {
    this.color = COMPARED_COLOR;
  }
  wasSwapped() {
    this.color = SWAPPED_COLOR;
  }
  resetColor() {
    this.color = DEFAULT_COLOR;
  }
}
