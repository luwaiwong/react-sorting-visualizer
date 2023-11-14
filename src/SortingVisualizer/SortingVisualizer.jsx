import React, { useState, useRef, useEffect } from 'react';
import './SortingVisualizer.css';

import Item from '../SortingAlgorithms/Item';

// Sorting Algorithms
import BubbleSort from '../SortingAlgorithms/BubbleSort';

// Constants
const NUMBER_OF_ARRAY_BARS = 100;
const MIN_HEIGHT = 50;
const MAX_HEIGHT = 1000;
export const arraySpeed = 15;

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
//#endregion

//#region Main Function
function SortingVisualizer() {
    const [array, setArray] = useState(generateRandomArray());
    

    const resetArray = () => {
        setArray([...generateRandomArray()]);

    }

    const sort = () => {
        BubbleSort(array, setArray);
    }

    return (
        <div >
            <button onClick={resetArray}>Generate New Array</button>
            <button onClick={sort}>Sort</button>

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