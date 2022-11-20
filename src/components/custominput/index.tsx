import React, { useState } from "react";
import "assets/styles/css/custominput.css";
interface IInput {
  placeholder?: string;
  error?: boolean;
  onChange?: any;
  value?: string;
  icon?: any;
  name?: string;
  id?: string;
}

const CostumInput = (props: IInput) => {
  const { placeholder, icon, onChange, id, name } = props;
  const [focus, setFocus] = useState(false);
  return (
    <>
      <div className="custominput-wrapper">
        <div className={`custominput-placeholder${focus ? " active" : ""}`}>
          {placeholder}
        </div>
        <input
          id={id}
          name={name}
          onChange={e => {
            onChange(e);
          }}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className="custominput"
        />
        <div>{icon}</div>
      </div>
    </>
  );
};

export default CostumInput;
