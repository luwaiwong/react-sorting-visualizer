import Item from "./Item";
import { finishSort } from "../SortingVisualizer/SortingVisualizer";

// Quicksort with choosing the first element as the pivot
// Time Complexity: O(nlogn) average, O(n^2) worst case
// Space Complexity: O(logn) average, O(n) worst case

// The main function that implements QuickSort
export default async function QuickSort(array, functions) {
  await partition(array, 0, array.length - 1, functions.setArray, functions);
  finishSort(array, functions);
}

async function partition(array, left, right, setArray, functions) {
  // If left > right, then cannot partition this section
  // just return
  if (left >= right) {
    return;
  }

  // Choose the first element as the pivot
  let pivot = array[left];
  let pivotPosition = left + 1;

  // loop through the array
  for (let i = left + 1; i <= right; i++) {
    // set the compared color
    let compared = array[i];
    let swapped = array[pivotPosition];
    compared.wasCompared();
    pivot.wasCompared();

    if (array[i].value < pivot.value) {
      // Set the swapped color
      compared.wasSwapped();
      swapped.wasSwapped();

      // Swap the current element with the element at the pivot position
      [array[i], array[pivotPosition]] = [array[pivotPosition], array[i]];
      pivotPosition++;
    }

    setArray([...array]);
    // Wait Timer
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, functions.arraySpeed)
    );

    // Reset colors
    compared.resetColor();
    swapped.resetColor();
    pivot.resetColor();
  }

  // Swap the pivot with the last element that is smaller than the pivot
  [array[left], array[pivotPosition - 1]] = [
    array[pivotPosition - 1],
    array[left],
  ];

  // Partition the left and right side of the pivot
  await partition(array, pivotPosition, right, setArray, functions);
  await partition(array, left, pivotPosition - 1, setArray, functions);
}
