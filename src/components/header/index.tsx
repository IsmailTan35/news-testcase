import React, { useState, useEffect } from "react";
import ModalWrapper from "components/modals/ModalWrapper";
import LoginModal from "components/modals/LoginModal";
import RegisterModal from "components/modals/RegisterModal";
import "assets/styles/css/header.css";
import { adminActions, useAppDispatch, useAppSelector } from "redux/store";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalName, setModalName] = useState<string>("login");
  const isLogin = useAppSelector(state => state.admin.item.token);

  const handleAuthLogin = async () => {
    setShowModal(true);
  };

  const handleAuthLogout = async () => {
    localStorage.removeItem("token");
    dispatch(adminActions.delete());
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalName("login");
  };

  const handleClickNavigate = () => {
    navigate("/panel");
  };

  useEffect(() => {
    if (!isLogin) return;
    handleCloseModal();
  }, [isLogin]);

  return (
    <>
      <div className="header-wrapper">
        <div className="header-container">
          <div className="header-left-wrapper">
            <div className="header-logo-wrapper">ISO.T</div>
          </div>
          <div className="header-right-wrapper">
            {isLogin && (
              <button
                className="header-right-panel-btn"
                onClick={handleClickNavigate}
              >
                Panel
              </button>
            )}
            <button
              className="header-right-auth-btn"
              onClick={isLogin ? handleAuthLogout : handleAuthLogin}
            >
              {isLogin ? "Çıkış Yap" : "Giriş Yap"}
            </button>
          </div>
        </div>
      </div>
      {showModal && (
        <ModalWrapper setShow={handleCloseModal}>
          {modalName === "login" ? (
            <LoginModal setModalName={setModalName} />
          ) : (
            <RegisterModal setModalName={setModalName} />
          )}
        </ModalWrapper>
      )}
    </>
  );
};

export default Header;
