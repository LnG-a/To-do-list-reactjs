import React, { useState } from "react";
import "./style.css";

function Input(props) {
  return (
    <div className="input-wrapper">
      <label className="input-label">{props.label}</label>
      <input
        style={{ height: props.height }}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onInput={(event) => {
          props.onInput(event.target.value);
        }}
        min={props.min}
        className={`${props.error === true ? "error-input" : ""}`}
      />
      {props.error === true ? (
        <span className="error-text">Please fill out this field!</span>
      ) : (
        <></>
      )}
    </div>
  );
}

Input.Description = function ItemDescription(props) {
  return (
    <div className="input-wrapper">
      <label className="input-label">{props.label}</label>
      <textarea
        rows="4"
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onInput={(event) => {
          props.onInput(event.target.value);
        }}
      />
    </div>
  );
};

// Input.Time = function InputTime(props) {
//   return (
//     <div className="input-wrapper">
//       <label className="input-label">{props.label}</label>
//       <input
//         type="date"
//         value={props.value}
//         onInput={(e) => {
//           props.onInput(e.target.value);
//         }}
//       />
//     </div>
//   );
// };

export default Input;
