import React, { useState, useRef, useEffect } from 'react';
import './SortingVisualizer.css';

import Item from '../SortingAlgorithms/Item';

// Sorting Algorithms
import BubbleSort from '../SortingAlgorithms/BubbleSort';
import QuickSort from '../SortingAlgorithms/QuickSort';

// Constants
const NUMBER_OF_ARRAY_BARS = 20;
const MIN_HEIGHT = 50;
const MAX_HEIGHT = 1000;
export const arraySpeed = 105;

// Variables
let sorted = false;
let sorting = false;

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
    return array
};

const generateRandomSymetricArray = () => {
    return randomizeArray(generateArray());
}

//#endregion

export async function finishSort(array, setArray) {
    sorting = false;
    for (let i = 0; i < array.length; i++) {
        array[i].resetColor();
    }
    setArray([...array]);
    for (let i = 0; i < array.length; i++) {
        array[i].wasSwapped();
        setArray([...array]);
        // Wait Timer
        await new Promise((resolve) =>
        setTimeout(() => {
            resolve();
        }, arraySpeed)
        );
    }
}
//#region Main Function
function SortingVisualizer() {
    const [array, setArray] = useState(generateRandomSymetricArray());
    

    const resetArray = () => {
        if (sorting) return;
        sorted = false;
        setArray([...generateRandomSymetricArray()]);

    }

    const quickSort = () => {
        if (sorting) return;
        sorting = true;
        if (sorted) {
            console.log("reset");
            resetArray();
        }
        sorted = true;
        QuickSort(array, setArray);
    }

    const bubbleSort = () => {
        if (sorting) return;
        sorting = true;
        if (sorted) {
            resetArray();
        }
        sorted = true;
        BubbleSort(array, setArray);
    }

    return (
        <div >
            <button onClick={resetArray}>Generate New Array</button>
            <button onClick={bubbleSort}>Bubble Sort</button>
            <button onClick={quickSort}>Quick Sort</button>

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