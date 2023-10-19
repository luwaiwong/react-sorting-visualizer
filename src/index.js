///// BASE CLASSES /////
/**
 * An abstract class for a sortable item
 */
class Item {
  value;
  wasModified;
  
  constructor(value) {}

  position() {}
  next() {}
  reset(){
    this.wasModified = false;
  }
}

class ListItem extends Item {
  list;
  listIndex;;

  constructor(value) {
    super(value);
  }

  position() {
    return this.listIndex;
  }
}


function convertToSortable() {}

///// SORTING ALGORITHMS /////
// Bubble sort
function bubblesort(array) {
  size = array.length;

  // loop to access each array element
  for (i = 0; i < size - 1; i++) {
    // check if swapping occurs
    swapped = false;

    // loop to compare adjacent elements
    for (j = 0; j < size - i - 1; j++) {
      // compare two array elements
      // change > to < to sort in descending order
      if (array[j] > array[j + 1]) {
        // swapping occurs if elements
        // are not in the intended order

        // Swap items in array
        temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;

        // Swap listitem index
        array[j].listIndex = j;
        array[j + 1].listIndex = j + 1;

        swapped = true;
      }
    }
    // no swapping means the array is already sorted
    // so no need for further comparison
    if (!swapped) break;
  }
  return array;
}

// Quick sort
function quicksort() {}

// Merge sort

// Selection sort

// Insertion sort

// Quick sort

// Heap sort

// Cocktail sort

// Bongo sort




///// CANAVS /////
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
C_WIDTH = 500
C_HEIGHT = 500

ctx.fillStyle = "#ffffff";
ctx.strokeStyle = "#ffffff"
// ctx.clearRect(0, 0, C_WIDTH, C_HEIGHT);
ctx.beginPath();
ctx.arc(100, 75, 50, 0, 2 * Math.PI);
ctx.stroke(); 

// Program Run
console.log("start");

array = [2, 3, 1, 0];
console.log(array);
console.log(bubblesort([0, 1, 2, 3]));

console.log("end");
