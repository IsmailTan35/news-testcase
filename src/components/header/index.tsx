import React from "react";
import "assets/styles/css/header.css";

const Header = () => {
  const isLogin = true;
  return (
    <>
      <div className="header-wrapper">
        <div className="header-container">
          <div className="header-left-wrapper"></div>
          <div className="header-right-wrapper">
            <div className="header-right-btn-theme">icon</div>
            {isLogin && (
              <button className="header-right-panel-btn">Panel</button>
            )}
            <button className="header-right-auth-btn">
              {isLogin ? "Logout" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
