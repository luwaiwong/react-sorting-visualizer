import React, { useState, useRef, useEffect } from 'react';
import './SortingVisualizer.css';

import Item from '../SortingAlgorithms/Item';

// Sorting Algorithms
import BubbleSort from '../SortingAlgorithms/BubbleSort';
import QuickSort from '../SortingAlgorithms/QuickSort';
import MergeSort from '../SortingAlgorithms/MergeSort';

// Constants
const NUMBER_OF_ARRAY_BARS = 50;
const MIN_HEIGHT = 50;
const MAX_HEIGHT = 1000;
export const arraySpeed = 100;

// Variables
let sorted = false;


//#region Generating random lists
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const generateRandomArray = () => {
    let n = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
        let item = new Item(randomIntFromInterval(MIN_HEIGHT, MAX_HEIGHT));
        n.push(item);
    }
    return n
};

const generateArray = () => {
    let n = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
        let item = new Item(i*(MAX_HEIGHT/NUMBER_OF_ARRAY_BARS));
        n.push(item);
    }
    return n
}

const randomizeArray = (array) => {
    for (let i = 0; i < array.length; i++) {
        let randomIndex = randomIntFromInterval(0, array.length - 1);
        [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    console.log("randomize")
    return array
};

const generateRandomSymetricArray = () => {
    return randomizeArray(generateArray());
}

//#endregion

export async function finishSort(array, functions) {
    for (let i = 0; i < array.length; i++) {
        array[i].resetColor();
    }
    functions.setArray([...array]);
    for (let i = 0; i < array.length; i++) {
        array[i].wasSwapped();
        functions.setArray([...array]);
        // Wait Timer
        await new Promise((resolve) =>
        setTimeout(() => {
            resolve();
        }, arraySpeed)
        );
    }
    functions.setSorting(false);
    functions.setSorted(true);
}
//#region Main Function
function SortingVisualizer() {
    const [array, setArray] = useState(generateArray);
    const [sorting, setSorting] = useState(false);
    const [sorted, setSorted] = useState(true);
    const functions = { setArray, setSorting, setSorted};

    const resetArray = () => {
        if (sorting) return;

        setSorted(false);
        let a = generateRandomSymetricArray();
        setArray([a]);
        return a;
    }

    const quickSort = () =>  {
        console.log(sorting, sorted)
        if (sorting) return;
        
        if (sorted) {
            QuickSort(resetArray(), functions);
        } else {
            QuickSort(array, functions);
        }
        
        setSorting(true);
    }

    const bubbleSort = () => {
        console.log(sorting, sorted)
        if (sorting) return;
        
        if (sorted) {
            BubbleSort(resetArray(), functions);
        }
        else {
            BubbleSort(array, functions);
        }
        setSorting(true);
    }
    

    const mergeSort = () => {
        console.log(sorting, sorted)
        if (sorting) return;
        if (sorted) {
            MergeSort(resetArray(), functions);
        }   else {
            MergeSort(array, functions);
        }
        setSorting(true);
    }

    return (
        <div >
            <button onClick={resetArray}>Generate New Array</button>
            <button onClick={bubbleSort}>Bubble Sort</button>
            <button onClick={quickSort}>Quick Sort</button>
            <button onClick={mergeSort}>Merge Sort</button>

            <div style={{ height: '100px' }}></div>

            <div className='flexbox'>
                {/* Sorting Algorithm Array Display */}
                <div className='array-container'>
                    {
                        array.map((item, idx) => (
                            <div
                                className='array-bar'
                                key={idx}
                                style={{
                                    backgroundColor: item.color,
                                    // Sets height and width to a percentage of the total height and width of the array container
                                    height: (item.value / MAX_HEIGHT) * 100 + '%',
                                    width: (1 / NUMBER_OF_ARRAY_BARS) * 100 + '%',
                                }}>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
//#endregion
export default SortingVisualizer;