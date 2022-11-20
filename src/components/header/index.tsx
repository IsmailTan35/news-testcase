import React from "react";
import "assets/styles/css/header.css";
import axios from "axios";
import ModalWrapper from "components/modals/ModalWrapper";
import LoginModal from "components/modals/LoginModal";
import RegisterModal from "components/modals/RegisterModal";

const Header = () => {
  const isLogin = true;

  const handleLogin = async () => {
    try {
      const res = axios.post("/auth/login", {
        username: "sa",
        password: "asda",
      });
    } catch (error) {}
  };

  return (
    <>
      <div className="header-wrapper">
        <div className="header-container">
          <div className="header-left-wrapper">
            <div className="header-logo-wrapper">ISO.T</div>
          </div>
          <div className="header-right-wrapper">
            {isLogin && (
              <button className="header-right-panel-btn">Panel</button>
            )}
            <button className="header-right-auth-btn" onClick={handleLogin}>
              {isLogin ? "Çıkış Yap" : "Giriş Yap"}
            </button>
          </div>
        </div>
      </div>
      <ModalWrapper title="2">
        <RegisterModal />
      </ModalWrapper>
    </>
  );
};

export default Header;
