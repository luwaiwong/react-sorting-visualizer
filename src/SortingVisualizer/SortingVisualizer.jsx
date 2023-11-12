import React, { useState, useRef, useEffect } from 'react';
import './SortingVisualizer.css';


const NUMBER_OF_ARRAY_BARS = 100;
const MIN_HEIGHT = 50;
const MAX_HEIGHT = 1000;


function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const generateRandomArray = () => {
    let n = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
        n.push(randomIntFromInterval(MIN_HEIGHT, MAX_HEIGHT));
    }
    return n
};

function SortingVisualizer() {


    const [array, setArray] = useState(generateRandomArray());

    const resetArray = () => {
        setArray([...generateRandomArray()]);

    }

    return (
        <div >
            <button onClick={resetArray}>Generate New Array</button>

            <div style={{ height: '100px' }}></div>

            <div className='flexbox'>
                {/* Sorting Algorithm Array Display */}
                <div className='array-container'>
                    {
                        array.map((value, idx) => (
                            <div
                                className='array-bar'
                                key={idx}
                                style={{
                                    height: (value / MAX_HEIGHT) * 100 + '%',
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

export default SortingVisualizer;