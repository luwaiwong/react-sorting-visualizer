/**
 * An abstract class for a sortable item
 */

class Item {
  value; // The value of the item
  wasModified; // If the item has been modified since the last sort
  
  constructor(value) {}

  position() {}
  next() {}
  reset(){
    this.wasModified = false;
  }
}