class Sortable {
  value;
  position;
}

function convertToSortable() {}

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
        temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;

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

// Program Run
console.log("start");

array = [2, 3, 1, 0];
console.log(array);
console.log(bubblesort([0, 1, 2, 3]));

console.log("end");
