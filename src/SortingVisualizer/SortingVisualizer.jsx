import React, { useState, useRef, useEffect } from 'react';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import './SortingVisualizer.css';

import Item from '../SortingAlgorithms/Item';
// Sorting Algorithms
import BubbleSort from '../SortingAlgorithms/BubbleSort';
import QuickSort from '../SortingAlgorithms/QuickSort';
import MergeSort from '../SortingAlgorithms/MergeSort';
import SelectionSort from '../SortingAlgorithms/SelectionSort';
import InsertionSort from '../SortingAlgorithms/InsertionSort';

// Constants
const NUMBER_OF_ARRAY_BARS = 30;
const CHANGED_ARRAY_BARS = 30;
const MIN_HEIGHT = 50;
const MAX_HEIGHT = 1000;
// export const arraySpeed = 3;

// Variables
let sorted = false;
let worker = null;

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
    return n };

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
        array[i].wasCompared();
        functions.setArray([...array]);
        // Wait Timer
        await new Promise((resolve) =>
        setTimeout(() => {
            resolve();
        }, functions.arraySpeed)
        );
    }
    functions.setSorting(false);
    functions.setSorted(true);
}
//#region Main Function
function SortingVisualizer() {
    
    const [array, setArray] = useState(generateArray);
    const [arraySpeed, setArraySpeed] = useState(0)
    const [curSort, setCur] = useState(0);
    const [sorted, setSorted] = useState(true);
    const [sorting, setSorting] = useState(false);

    const functions = { setArray, setSorted, arraySpeed, setSorting};

    const resetArray = () => {
        if (sorting) return;

        if (CHANGED_ARRAY_BARS !== NUMBER_OF_ARRAY_BARS) {
            NUMBER_OF_ARRAY_BARS = CHANGED_ARRAY_BARS;
        }
        setSorted(false);
        let a = generateRandomSymetricArray();
        setArray([...a]);
        return a;
    }

    const quickSort = () =>  {
        if (sorting) return;
        setSorting(true);
        setCur(2000)
        if (sorted) {
            QuickSort(resetArray(), functions);
        } else {
            QuickSort(array, functions);
        }
        
        setCur(2000)
    }

    const bubbleSort = () => {
        if (sorting) return;
        setSorting(true);
        
        if (sorted) {
            BubbleSort(resetArray(), functions);
        }
        else {
            BubbleSort(array, functions);
        }
        setCur(curSort+1)
    }
    

    const mergeSort = () => {
        // console.log(sorting, sorted)
        if (sorting) return;
        setSorting(true);

        if (sorted) {
            MergeSort(resetArray(), functions);
        }   else {
            MergeSort(array, functions);
        }
        setCur(curSort+1)
    }


    const selectionSort = () => {
        // console.log(sorting, sorted)
        if (sorting) return;
        setSorting(true);

        if (sorted) {
            SelectionSort(resetArray(), functions);
        }   else {
            SelectionSort(array, functions);
        }
        setCur(curSort+1)
    }

    const insertionSort = () => {
        if (sorting) return;
        setSorting(true);

        if (sorted) {
            InsertionSort(resetArray(), functions);
        } else {
            InsertionSort(array, functions);
        }
        setCur(curSort+1)
    }

    const onChangeSize = (value) => {
        CHANGED_ARRAY_BARS = value;
        resetArray();
    }

    const onChangeSpeed = (value) => {
        setArraySpeed(50-value);
    }
    return (
        <div className='background'>
            <div className='top-bar'>
                <div className='title'>
                    
                    <h1 >Sorting Algorithms Visualizer</h1>
                </div>
            </div>

            <div className='content-container'>
                <div className="left-panel">
                    <div className="control-panel">
                        
                        {/* <p className="slider-title">Speed</p>
                        <Slider defaultValue={0}
                            min={0}
                            max={30}
                            onChangeComplete={onChangeSpeed}
                        /> */}
                        {sorting ? <button onClick={()=>{window.location.reload()}}>Stop</button>: <button onClick={resetArray}>Shuffle</button>}
                        
                        {/* <p className="slider-title">Speed</p>
                        <Slider defaultValue={0}
                            min={0}
                            max={30}
                            onChangeComplete={onChangeSpeed}
                        /> */}
                        <p className="slider-title">Size</p>
                        <Slider defaultValue={40}
                            min={10}
                            max={350}
                            onChangeComplete={onChangeSize}
                        />

                        <p className="slider-title">Speed</p>
                        <Slider defaultValue={50}
                            min={0}
                            max={50}
                            onChangeComplete={onChangeSpeed}
                        />
                        <h1 className="button-section-title">Algorithms</h1>
                        <button onClick={quickSort}>Quick</button>
                        <button onClick={mergeSort}>Merge</button>
                        <button onClick={selectionSort}>Selection</button>
                        <button onClick={insertionSort}>Insertion</button>
                        <button onClick={bubbleSort}>Bubble</button>
                    </div>
                    <div className='bottom-section'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24"><path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z" className='home-icon' onClick={() => window.open('https://www.luwai.dev')} ></path></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2" className='github-icon' onClick={() => window.open('https://github.com/luwaiwong/react-sorting-visualizer')}></path></svg>
                    </div>
                </div>
                <div className='array-display-container'>
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
                                        height: (item.value / MAX_HEIGHT) * 100 + (1/NUMBER_OF_ARRAY_BARS) * 100 + '%',
                                        width: (1 / NUMBER_OF_ARRAY_BARS) * 100 + '%',
                                    }}>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
//#endregion
export default SortingVisualizer;