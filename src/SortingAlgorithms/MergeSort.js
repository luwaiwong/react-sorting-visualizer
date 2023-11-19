import Item from "./Item";
import { arraySpeed, finishSort } from "../SortingVisualizer/SortingVisualizer";

// MergeSort

export default async function MergeSort(array, functions) {
  // Wait Timer
  await new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, arraySpeed)
  );
  await sort(array, functions.setArray, 0, array.length - 1);
  finishSort(array, functions);
}

async function sort(array, setArray, left, right) {
  if (left >= right) {
    return;
  }

  let middle = Math.floor((left + right) / 2);
  await sort(array, setArray, left, middle);
  await sort(array, setArray, middle + 1, right);
  await merge(array, setArray, left, middle, right);
}

async function merge(array, setArray, left, middle, right) {
  // Define left and right to store info
  let leftArray = array.slice(left, middle + 1);
  let rightArray = array.slice(middle + 1, right + 1);

  let leftIndex = 0;
  let rightIndex = 0;
  let arrayIndex = left;

  // Loop through left and right arrays
  // Continuously add smaller element to array
  while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
    let leftSwapped = false;
    leftArray[leftIndex].wasCompared();
    rightArray[rightIndex].wasCompared();
    // Add left array if left smaller, right if right smaller
    if (leftArray[leftIndex].value <= rightArray[rightIndex].value) {
      leftArray[leftIndex].wasSwapped();
      leftSwapped = true;

      array[arrayIndex] = leftArray[leftIndex];
      leftIndex++;
    } else {
      leftArray[leftIndex].wasSwapped();
      //   rightArray[rightIndex].wasSwapped();

      array[arrayIndex] = rightArray[rightIndex];
      rightIndex++;
    }
    arrayIndex++;

    setArray([...array]);

    // Wait Timer
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, arraySpeed)
    );

    if (leftSwapped) {
      leftArray[leftIndex - 1].resetColor();
      rightArray[rightIndex].resetColor();
    } else {
      leftArray[leftIndex].resetColor();
      rightArray[rightIndex - 1].resetColor();
    }
  }

  // Add remaining elements
  while (leftIndex < leftArray.length) {
    array[arrayIndex] = leftArray[leftIndex];
    array[arrayIndex].wasSwapped();
    leftIndex++;
    arrayIndex++;

    setArray([...array]);
    // Wait Timer
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, arraySpeed)
    );
    array[arrayIndex - 1].resetColor();
  }

  while (rightIndex < rightArray.length) {
    array[arrayIndex] = rightArray[rightIndex];
    array[arrayIndex].wasSwapped();
    rightIndex++;
    arrayIndex++;

    setArray([...array]);

    // Wait Timer
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, arraySpeed)
    );
    array[arrayIndex - 1].resetColor();
  }
  setArray([...array]);
}
