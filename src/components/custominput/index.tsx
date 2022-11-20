import React, { FocusEventHandler, useEffect, useRef, useState } from "react";
import "assets/styles/css/custominput.css";
interface IInput {
  placeholder?: string;
  error?: boolean;
  onChange?: any;
  value?: string;
  icon?: any;
  name?: string;
  id?: string;
  type?: string;
}

const CostumInput = (props: IInput) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { placeholder, icon, onChange, id, name, error, type, value } = props;
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

  useEffect(() => {
    let count = false;
    if (count || !value || !inputRef || !inputRef.current) return;
    inputRef.current.value = value;
    setActive(true);
    return () => {
      count = true;
    };
  }, [inputRef, value]);

  return (
    <>
      <div
        className={`custominput-wrapper${!error ? " error" : ""}`}
        onMouseUp={handleClick}
      >
        <div
          className={`custominput-placeholder${
            focus || active ? " active" : ""
          }`}
        >
          {placeholder}
        </div>
        <input
          id={id}
          name={name}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="custominput"
          ref={inputRef}
          type={type}
          value={value}
        />
        <div>{icon}</div>
      </div>
    </>
  );
};

export default CostumInput;
