import Item from "./Item";
import { finishSort } from "../SortingVisualizer/SortingVisualizer";

export default async function selectionSort(array, functions) {
  let sorted = array;
  let setArray = functions.setArray;

  let min = 0;
  for (let i = 0; i < sorted.length; i++) {
    min = i;

    sorted[i].wasSwapped();

    // Find minimum element in the rest of the array
    for (let j = i + 1; j < sorted.length; j++) {
      sorted[j].wasCompared();
      sorted[min].wasSwapped();
      if (sorted[j].value < sorted[min].value) {
        if (min != i) {
          sorted[min].resetColor();
        }

        min = j;

        sorted[min].wasSwapped();
      }

      // Set array in main component
      setArray([...sorted]);

      // Wait Timer
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, functions.arraySpeed / 4)
      );
      sorted[j].resetColor();
    }

    // Swap elements
    let temp = sorted[i];
    sorted[i] = sorted[min];
    sorted[min] = temp;

    temp.resetColor();
    sorted[i].resetColor();
    // Set array in main component
    setArray([...sorted]);

    // Wait Timer
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, functions.arraySpeed)
    );
  }

  setArray([...sorted], functions.curSort);

  finishSort(array, functions);
  return sorted;
}
