import React from 'react';

export default function Square(props) {
    return (
        <div id={props.id} style={{
            backgroundColor: props.dark ? "darkgray" : "lightgray",
            width: "40px",
            height: "40px",
            }}
             onClick={() => props.handleClick(props.i, props.j)}
        >{props.children}</div>
    )
}