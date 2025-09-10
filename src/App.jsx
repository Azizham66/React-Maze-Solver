import React from 'react';
import './App.css'
import Path from "./Components/Path.jsx";
import Wall from "./Components/Wall.jsx";
import Player from "./Components/Player.jsx";
import Goal from "./Components/Goal.jsx";
import GameBoard from "./Components/GameBoard.jsx";

function App() {
    return (
        <div className="App">
            <GameBoard/>
        </div>
    )
}

export default App
