import React, { FocusEventHandler, useEffect, useRef, useState } from "react";
import "assets/styles/css/custominput.css";
import "assets/styles/css/custominputfile.css";

interface IInput {
  placeholder?: string;
  error?: boolean;
  onChange?: any;
  value?: string;
  icon?: any;
  name?: string;
  id?: string;
}

const CostumInputImage = (props: IInput) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { placeholder, icon, onChange, id, name, error } = props;
  const [focus, setFocus] = useState(false);
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setFocus(true);
    inputRef.current?.focus();
  };

  const handleBlur = (e: any) => {
    setFocus(false);
    !e.target.value || e.target.value === ""
      ? setActive(false)
      : setActive(true);
  };

  const handleFocus = () => {
    setFocus(true);
  };

  const handleChange = (e: any) => {
    onChange(e);
    if (!e.target.value || e.target.value === "") return;
    setActive(true);
  };

  return (
    <>
      <div
        className={`custominput-wrapper${!error ? " error" : ""}`}
        onMouseUp={handleClick}
        style={{
          height: "auto",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <div
          className={`custominput-placeholder${true ? " active" : ""}`}
          style={{
            position: "static",
          }}
        >
          {placeholder}
        </div>
        <input
          alt="Submit"
          type="file"
          id={id}
          name={name}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="custominput custominputfile"
          ref={inputRef}
          accept="image/png, image/gif, image/jpeg"
        />
        <div>{icon}</div>
      </div>
    </>
  );
};

export default CostumInputImage;
