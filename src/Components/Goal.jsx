import React from 'react';
import BaseEntity from "../Elements/BaseEntity.js";
import GoalEntity from "../Elements/GoalEntity.js";

const goal = new GoalEntity();

export default function Goal({ handleSelectionClick, goalStyle }) {

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
        <div
            className={"entity"}
            onClick={
                () => handleSelectionClick("Goal")
            }
            style={{
                display: "flex",
                boxSizing: "border-box",
                width: "90px",
                height: "90px",
                backgroundColor: "#568F87",
                ...goalStyle
        }}
        >
            <img
                src={String(goal.sprite)}
                alt="GoalEntity Sprite"
                draggable
                onDragStart={(e) => dragStart(e, "Goal")}
            />
        </div>
    )
}