import React, { useState } from 'react';


const NUMBER_OF_ARRAY_BARS = 310;


function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const generateRandomArray = () => {
    let n = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
        n.push(randomIntFromInterval(5, 730));
    }
    return n
};

function SortingVisualizer() {



    const [array, setArray] = useState(generateRandomArray());

    const resetArray = () => {
        setArray([...generateRandomArray()]);

    }

    return (
        <div>
            <button onClick={resetArray}>Generate New Array</button>
            {
                array.map((value, idx) => (
                    <div>{value}</div>

                ))
            }
        </div>
    )
}

export default SortingVisualizer;