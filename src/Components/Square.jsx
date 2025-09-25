import React from 'react';

export default function Square({ id, dark, handleClick, i, j, children }) {
    return (
        <div
            id={id}
            onClick={() => handleClick(i, j)}
            style={{
                backgroundColor: dark ? "#444" : "#555",
                width: "100%",
                height: "100%",
                borderRadius: "4px",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {children}
        </div>
    );
}
