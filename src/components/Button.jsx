import React, { Fragment } from "react";
import "./Button.css";

export default (props) => {
  const { text, onClick } = { ...props };

  return (
    <div className="Button">
      <button onClick={onClick}>
        {text}
      </button>
    </div>
  );
};
