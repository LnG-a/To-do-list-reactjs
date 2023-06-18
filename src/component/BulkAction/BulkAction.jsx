import React from "react";
import Button from "../Button/Button";
import "./style.css";
function BulkAction(props) {
  return (
    <div className="bulk-action">
      <div className="bulk-action-title">Bulk Action:</div>
      <div>
        <Button type="secondary" label="Done" onClick={() => {}} />
        <Button type="danger" label="Remove" onClick={props.handleRemoveTask} />
      </div>
    </div>
  );
}

export default BulkAction;
