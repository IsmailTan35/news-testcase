import React from "react";

interface IProps {
  children?: JSX.Element | JSX.Element[];
  setShow?: any;
  setModalName?: any;
}

const ModalWrapper: React.FC<IProps> = ({
  setShow,
  setModalName,
  children,
}) => {
  return (
    <div className="modal-wrapper">
      <div className="modal-container">
        <div className="modal-backdrop" onClick={setShow} />
        <div className="modal">
          <div className="modal-close-btn-wrapper">
            <div className="modal-close-btn" onClick={setShow}>
              X
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalWrapper;
