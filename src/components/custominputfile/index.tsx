import React, { FocusEventHandler, useEffect, useRef, useState } from "react";
import "assets/styles/css/custominput.css";
import "assets/styles/css/custominputfile.css";

interface IInput {
  placeholder?: string;
  error?: boolean;
  onChange?: any;
  value?: any;
  value2?: any;
  icon?: any;
  name?: string;
  id?: string;
}

const CostumInputImage = (props: IInput) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { placeholder, icon, onChange, id, name, error, value, value2 } = props;
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
          placeholder="2131"
          style={{ display: "none" }}
        />

        <label
          htmlFor={id}
          style={{
            width: "100%",
            height: "100%",
            cursor: "pointer",
          }}
        >
          {value !== null
            ? value.name
            : value2 !== null
            ? "Resim Değiştir"
            : "Resim Ekle"}
        </label>
        <div>{icon}</div>
      </div>
    </>
  );
};

export default CostumInputImage;
