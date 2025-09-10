import React from 'react';
import BaseEntity from "../Elements/BaseEntity.js";
import WallEntity from "../Elements/WallEntity.js";

const wall = new WallEntity();

export default function Wall(props) {

    function dragStart(e, type) {
        e.preventDefault(); // optional, stops default browser behavior
        e.dataTransfer.setData("tileType", type);

        // hide default ghost image
        const img = new Image();
        img.src =
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=";
        e.dataTransfer.setDragImage(img, 0, 0);
    }

    return (
        <div className={"select-entity"}
             onClick={
                 () => props.handleSelectionClick("Wall")
             }
             style={{display: "flex", boxSizing: "border-box" ,...props.wallStyle}}
        >
            <img
                src={String(wall.sprite)}
                alt="WallEntity Sprite"
                draggable
                onDragStart={(e) => dragStart(e, "Wall")}
            />
        </div>
    )
}