const DEFAULT_COLOR = "black";
const COMPARED_COLOR = "green";
const SWAPPED_COLOR = "red";

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
