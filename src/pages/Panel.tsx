import React, { useState } from "react";
import "assets/styles/css/panel.css";
import ModalWrapper from "components/modals/ModalWrapper";
import CreateNewModal from "components/modals/CreateNewModal";

const Panel = () => {
  const [show, setShow] = useState(false);

  const handleOpenModal = () => {
    setShow(prv => !prv);
  };
  return (
    <>
      <div className="panel-wrapper">
        <div className="panel-container">
          <div className="panel-header">
            <div className="panel-news-add" onClick={handleOpenModal}>
              Yeni Haber Ekle
            </div>
          </div>
          <div className="panel-table"></div>
        </div>
      </div>
      {show && (
        <ModalWrapper setShow={handleOpenModal}>
          <CreateNewModal />
        </ModalWrapper>
      )}
    </>
  );
};

export default Panel;
