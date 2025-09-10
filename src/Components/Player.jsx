import React from 'react';
import BaseEntity from "../Elements/BaseEntity.js";
import PlayerEntity from "../Elements/PlayerEntity.js";

const player = new PlayerEntity();

export default function Player() {

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
        <div className={"select-entity"}>
            <img
                src={String(player.sprites.stand)}
                alt="PlayerEntity Sprite"
                draggable
                onDragStart={(e) => dragStart(e, "Player")}
            />
        </div>
    )
}