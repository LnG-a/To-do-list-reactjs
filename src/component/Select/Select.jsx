import React from "react";
import "./style.css";
function Select(props) {
  return (
    <div className="select-wrapper">
      <div className="select-label">{props.label}</div>
      <select
        className="select-main"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      >
        {props.children}
      </select>
    </div>
  );
}

function Option(props) {
  return (
    <option className="option" value={props.value} selected={props.selected}>
      {props.value}
    </option>
  );
}

export { Select, Option };
