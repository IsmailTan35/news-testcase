import React from "react";

interface IProps {
  title: string;
  children?: JSX.Element | JSX.Element[];
}

const ModalWrapper: React.FC<IProps> = ({ title, children }) => {
  return (
    <div className="modal-wrapper">
      <div className="modal-container">
        <div className="modal-backdrop"></div>
        <div className="modal">{children}</div>
      </div>
    </div>
  );
};

export default ModalWrapper;
