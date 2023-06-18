import React from "react";
import "./style.css";
function Button(props) {
  return (
    <button
      style={{
        margin: props.margin,
        width: props.width,
        maxWidth: props.maxWidth,
        minWidth: props.minWidth,
      }}
      className={`button ${props.type}`}
      onClick={(e) => {
        e.preventDefault();
        props.onClick();
      }}
    >
      {props.label}
    </button>
  );
}

export default Button;
