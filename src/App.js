import React from "react";
import "./App.css";
import SortingVisualizer from "./SortingVisualizer/SortingVisualizer";

function App() {
  return (
    <div className="App">
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap');
      </style>
      <SortingVisualizer></SortingVisualizer>
    </div>
  );
}

export default App;
