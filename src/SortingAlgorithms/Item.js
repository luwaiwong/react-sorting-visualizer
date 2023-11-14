const DEFAULT_COLOR = "black";
const COMPARED_COLOR = "red";
const SWAPPED_COLOR = "green";

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
