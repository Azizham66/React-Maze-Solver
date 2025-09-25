// Path.jsx
import React from 'react';
import PathEntity from "../Elements/PathEntity.js";

export default function Path(props) {

    const path = new PathEntity();

    const imgSrc = props.sprite || String(path.sprite);

    function dragStart(e, type) {
        e.preventDefault();
        e.dataTransfer.setData("tileType", type);
        const img = new Image();
        img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=";
        e.dataTransfer.setDragImage(img, 0, 0);
    }

    return (
        <div className={"entity"}
             onClick={
                 () => props.handleSelectionClick("Path")
             }
             style={{ display: "flex", boxSizing: "border-box", width: "90px", height: "90px", ...props.pathStyle }}
        >
            <img
                src={imgSrc}
                alt="PathEntity Sprite"
                draggable
                onDragStart={(e) => dragStart(e, "Path")}
                name="Path"
            />
        </div>
    );
}
