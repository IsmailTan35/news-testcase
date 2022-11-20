import Header from "components/header";
import StockMarket from "components/stockmarket";
import React from "react";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <>
      <div className="main-wrapper">
        <Header />
        <StockMarket />
        <Outlet />
      </div>
    </>
  );
};

export default Main;
