import React from "react";
import "./style.css";
import Input from "../Input/Input";
import Button from "../Button/Button";

function Form(props) {
  return <form className="form">{props.children}</form>;
}

Form.Input = function FormInput(props) {
  return (
    <Input
      label={props.label}
      placeholder={props.placeholder}
      type="text"
      value={props.value}
      onInput={props.onInput}
    />
  );
};

Form.Wrapper = function FormWrapper(props) {
  return <div className="form-wrapper">{props.children}</div>;
};

Form.Submit = function FormSubmit(props) {
  return (
    <div className="form-submit">
      <Button
        width="100%"
        margin="10px 0px"
        type={props.type}
        onClick={props.onClick}
        label={props.label}
      />
    </div>
  );
};

export default Form;
