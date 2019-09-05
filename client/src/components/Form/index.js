import React from "react";

// This file exports the Input, TextArea, and FormBtn components

export function Input(props) {
  return (
    <div className="form-group">
      <input className="form-control" {...props} />
    </div>
  );
}

export function Checkbox(props) {
  return (
    <div className="form-check">
      <input className="form-check-input" type="checkbox" id="defaultCheck1" />
      <label className="form-check-label" for="defaultCheck1">
        {props.children}
      </label>
    </div>
  );
}

export function TextArea({ props }) {
  return (
    <div className="form-group">
      <textarea className="form-control" rows="10">
        {props.children}
      </textarea>
    </div>
  );
}

export function FormBtn(props) {
  return (
    <button
      {...props}
      style={{ float: "right", marginBottom: 10 }}
      className="btn btn-success"
    >
      {props.children}
    </button>
  );
}
