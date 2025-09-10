import React, { useState } from 'react';
import Square from './Square';
import PathEntity from "../Elements/PathEntity.js";
import WallEntity from "../Elements/WallEntity.js";
import Path from "./Path.jsx";
import Wall from "./Wall.jsx";

export default function GameBoard() {
    const [entities, setEntities] = useState({});
    const [selectedType, setSelectedType] = useState(null);
    const [wallStyle, setWallStyle] = useState({});
    const [pathStyle, setPathStyle] = useState({});


    const handleSelectionClick = (type) => {
        if (type === "Path") {
            setSelectedType("PathEntity");
            setPathStyle({
                border: "2px solid white",
            });
            setWallStyle({});
        }
        else if (type === "Wall") {
            setSelectedType("WallEntity");
            setWallStyle({
                border: "2px solid white",
            });
            setPathStyle({});
        }
    };

    const handleSquareClick = (i, j) => {
        if (!selectedType) return;
        const key = `${i}-${j}`;
        setEntities(prev => ({
            ...prev,
            [key]: selectedType
        }));

    };

    const renderSquare = (i, j) => {
        const dark = (i + j) % 2 === 1;
        const key = `${i}-${j}`;
        const entityType = entities[key];

        let entityComponent = null;
        if (entityType === "PathEntity") {
            const pathEntity = new PathEntity();
            entityComponent = <img src={String(pathEntity.sprite)} alt="Path Sprite" style={{ width: '100%', height: '100%' }} />;
        } else if (entityType === "WallEntity") {
            const wallEntity = new WallEntity();
            entityComponent = <img src={String(wallEntity.sprite)} alt="Wall Sprite" style={{ width: '100%', height: '100%' }} />;
        }

        return (
            <Square
                key={key}
                id={key}
                dark={dark}
                handleClick={handleSquareClick}
                i={i}
                j={j}
            >
                {entityComponent}
            </Square>
        );
    };

    const squares = [];
    for (let i = 0; i < 16; i++) {
        for (let j = 0; j < 16; j++) {
            squares.push(renderSquare(i,j));
        }
    }

    return (
        <div className="container"
             style={{
                 display: "flex",
                 flexDirection: "column",
                 alignItems: "center",
                 gap: 20,
                 width: "100%",
                 height: "100%",
             }}
        >
            <div className="game-board"
                 style={{
                     width: 40 * 16,
                     height: 40 * 16,      
                     display: 'flex',
                     flexWrap: 'wrap',
                 }}
            >
                {squares}
            </div>
            <div className="selection-tool"
                 style={{
                     display: "flex",
                     gap: "10px",
                     marginTop: "20px",
                     width: "100%",
                     justifyContent: "center",

                 }}
            >
                <Path handleSelectionClick={handleSelectionClick} pathStyle={pathStyle} />
                <Wall handleSelectionClick={handleSelectionClick} wallStyle={wallStyle} />
            </div>
        </div>
    )
}