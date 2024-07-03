import Item from "./Item";
import { finishSort } from "../SortingVisualizer/SortingVisualizer";

export default async function insertionSort(array, functions) {
  let sorted = array;
  let setArray = functions.setArray;

  for (let i = 1; i < sorted.length; i++) {
    let cur = i;
    let j = i - 1;

    while (j >= 0) {
      if (sorted[j].value > sorted[cur].value) {
        let temp = sorted[j];
        let oldCur = cur;
        sorted[j] = sorted[cur];
        sorted[cur] = temp;
        cur = j;

        // Animation
        sorted[cur].wasSwapped();
        // sorted[oldCur].wasSwapped();
        setArray([...sorted]);
        await new Promise((resolve) =>
          setTimeout(() => {
            resolve();
          }, functions.arraySpeed)
        );

        sorted[cur].resetColor();
        sorted[oldCur].resetColor();
        setArray([...sorted]);
      } else {
        sorted[cur].wasSwapped();
        sorted[j].wasCompared();
        setArray([...sorted]);
        // Wait Timer
        await new Promise((resolve) =>
          setTimeout(() => {
            resolve();
          }, functions.arraySpeed)
        );
        sorted[j].resetColor();
        setArray([...sorted]);
      }

      // console.log("j: ", j);
      j--;
    }

    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, functions.arraySpeed)
    );

    sorted[cur].resetColor();
  }

  finishSort(array, functions);
  return sorted;
}
