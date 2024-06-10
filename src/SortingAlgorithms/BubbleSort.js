import Item from "./Item";
import { arraySpeed, finishSort } from "../SortingVisualizer/SortingVisualizer";

export default async function bubblesort(array, functions) {
  let sorted = array;
  let setArray = functions.setArray;
  for (let i = 0; i < sorted.length; i++) {
    for (let j = 1; j < sorted.length - i; j++) {
      // Set colors
      sorted[j - 1].wasCompared();
      sorted[j].wasCompared();

      if (sorted[j - 1].value > sorted[j].value) {
        // Do swap
        let temp = sorted[j - 1];
        sorted[j - 1] = sorted[j];
        sorted[j] = temp;

        // Set colors
        sorted[j].wasSwapped();
        // sorted[j - 1].wasSwapped();
      }

      // Set array in main component
      setArray([...sorted]);

      // Wait Timer
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, arraySpeed)
      );
      // Reset colors
      sorted[j - 1].resetColor();
      sorted[j].resetColor();
    }
  }

  finishSort(array, functions);
  return sorted;
}
