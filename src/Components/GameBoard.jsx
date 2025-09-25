import React, { useState } from 'react';
import Square from './Square';
import PathEntity from "../Elements/PathEntity.js";
import WallEntity from "../Elements/WallEntity.js";
import PlayerEntity from "../Elements/PlayerEntity.js";
import GoalEntity from "../Elements/GoalEntity.js";
import Path from "./Path.jsx";
import Wall from "./Wall.jsx";
import Player from "./Player.jsx";
import Goal from "./Goal.jsx";
import aStar from "../Utils/pathFinding.js";

export default function GameBoard() {
    const [entities, setEntities] = useState({});
    const [selectedType, setSelectedType] = useState(null);
    const [wallStyle, setWallStyle] = useState({});
    const [pathStyle, setPathStyle] = useState({});
    const [playerStyle, setPlayerStyle] = useState({});
    const [goalStyle, setGoalStyle] = useState({});
    const [playerPos, setPlayerPos] = useState(null);
    const [goalPos, setGoalPos] = useState(null);
    const [playerCount, setPlayerCount] = useState(0);
    const [goalCount, setGoalCount] = useState(0);
    const [pathTiles, setPathTiles] = useState([]);

    const handleSelectionClick = (type) => {
        setSelectedType(type === "Delete" ? "Delete" : `${type}Entity`);
        setWallStyle({}); setPathStyle({}); setPlayerStyle({}); setGoalStyle({});
        if(type === "Wall") setWallStyle({ border: "2px solid white" });
        if(type === "Path") setPathStyle({ border: "2px solid white" });
        if(type === "Player" && playerCount===0) setPlayerStyle({ border: "2px solid white" });
        if(type === "Goal" && goalCount===0) setGoalStyle({ border: "2px solid white" });
    };

    const handleSquareClick = (i, j) => {
        if(!selectedType) return;
        const key = `${i}-${j}`;

        // DELETE logic
        if(selectedType === "Delete") {
            setEntities(prev => {
                const newEntities = { ...prev };
                delete newEntities[key];
                return newEntities;
            });

            if(playerPos && playerPos[0] === i && playerPos[1] === j) {
                setPlayerPos(null);
                setPlayerCount(0);
            }
            if(goalPos && goalPos[0] === i && goalPos[1] === j) {
                setGoalPos(null);
                setGoalCount(0);
            }

            return;
        }
         if (selectedType === "Clear") {
             setEntities({});
             setPlayerPos(null);
             setGoalPos(null)
             setPlayerCount(0);
             setGoalCount(0);
             return;
         }


        // Add Player
        if(selectedType==="PlayerEntity" && playerCount<1 && entities[key]==="PathEntity"){
            setPlayerCount(1);
            setPlayerPos([i,j]);
            setSelectedType(null);
            return;
        }
        // Add Goal
        if(selectedType==="GoalEntity" && goalCount<1 && entities[key]==="PathEntity"){
            setGoalCount(1);
            setGoalPos([i,j]);
            setSelectedType(null);
            return;
        }

        // Add Path or Wall
        setEntities(prev => ({...prev, [key]: selectedType}));
    };

    const renderSquare = (i,j) => {
        const dark = (i+j)%2===1;
        const key = `${i}-${j}`;
        const entityType = entities[key];

        let entityComponent = null;
        if(entityType==="PathEntity") entityComponent=<img src={String(new PathEntity().sprite)} alt="Path" style={{width:"100%", height:"100%"}}/>
        if(entityType==="WallEntity") entityComponent=<img src={String(new WallEntity().sprite)} alt="Wall" style={{width:"100%", height:"100%"}}/>

        return (
            <Square key={key} id={key} dark={dark} handleClick={handleSquareClick} i={i} j={j}>
                <div style={{position:"relative", width:"100%", height:"100%"}}>
                    {entityComponent}

                    {/* Path overlay */}
                    {pathTiles.some(p => p.y===i && p.x===j) && <div style={{position:"absolute", top:0,left:0,width:"100%",height:"100%",backgroundColor:"rgba(0,0,0,0.5)", zIndex:1}} />}

                    {/* Player overlay */}
                    {playerPos && playerPos[0]===i && playerPos[1]===j && <img src={String(new PlayerEntity().sprites.stand)} alt="Player" style={{position:"absolute", top:0,left:0,width:"100%",height:"100%", zIndex:2}}/>}

                    {/* Goal overlay */}
                    {goalPos && goalPos[0]===i && goalPos[1]===j && <img src={String(new GoalEntity().sprite)} alt="Goal" style={{position:"absolute", top:0,left:0,width:"100%",height:"100%", zIndex:2}}/>}
                </div>
            </Square>
        );
    };

    const squares=[];
    for(let i=0;i<16;i++){
        for(let j=0;j<16;j++){
            squares.push(renderSquare(i,j));
        }
    }

    const coords = Object.keys(entities).map(k=>{const [r,c]=k.split("-").map(Number);return {row:r,col:c,type:entities[k]}});
    const rows = coords.map(c=>c.row); const cols = coords.map(c=>c.col);
    const minRow=Math.min(...rows); const maxRow=Math.max(...rows);
    const minCol=Math.min(...cols); const maxCol=Math.max(...cols);

    const grid=[];
    for(let r=minRow;r<=maxRow;r++){
        const rowArr=[];
        for(let c=minCol;c<=maxCol;c++){
            rowArr.push(entities[`${r}-${c}`]==="PathEntity");
        }
        grid.push(rowArr);
    }

    const solve = async () => {
        if(!playerPos || !goalPos) return;
        const path = await aStar(playerPos, goalPos, grid);
        if(path) setPathTiles(path);
        else setPathTiles([]);
    };

    return (
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", gap:20}}>
            <div className="game-board">{squares}</div>
            <div className="selection-tool">
                <Path handleSelectionClick={handleSelectionClick} pathStyle={pathStyle}/>
                <Wall handleSelectionClick={handleSelectionClick} wallStyle={wallStyle}/>
                <Player handleSelectionClick={handleSelectionClick} playerStyle={playerStyle}/>
                <Goal handleSelectionClick={handleSelectionClick} goalStyle={goalStyle}/>
                <button onClick={solve}>Solve</button>
                <button className='btn-low-danger' onClick={() => handleSelectionClick("Delete")}>Delete</button>
                <button className='btn-danger' onClick={() => {
                    if(window.confirm("Are you sure you want to clear the entire board?")) {
                        setEntities({});
                        setPlayerPos(null);
                        setGoalPos(null);
                        setPlayerCount(0);
                        setGoalCount(0);
                        setPathTiles([]);
                    }
                }}>Clear</button>
            </div>
        </div>
    );
}
