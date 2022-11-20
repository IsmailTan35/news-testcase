import Header from "components/header";
import StockMarket from "components/stockmarket";
import React from "react";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <>
      <div
        className="main-wrapper"
        style={{
          width: "100vw",
          height: "100vh",
        }}
      >
        <Header />
        <StockMarket />
        <Outlet />
      </div>
    </>
  );
};

export default Main;
