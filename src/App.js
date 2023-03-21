import './App.css';
import React from "react";
import Dropdown from "./components/dropdown/Dropdown";

function App() {
  return (
    <div className="App">
      <h1>Welcome to our cats dashboard</h1>
      <h2>This dashboard will give you the top 5 breeds of cats based on your selection from the available dropdown options. Please select an option below to see the results</h2>
       <Dropdown/>
    </div>
  );
}

export default App;
