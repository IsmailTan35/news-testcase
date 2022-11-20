import React from "react";
import "assets/styles/css/App.css";
import { Route, Routes } from "react-router-dom";
import Main from "layout/Main";
import axios from "axios";

axios.defaults.baseURL =
  process.env.NODE_ENV === "production"
    ? "https://newstestcasebackend.vercel.app"
    : "http://localhost:10000";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </>
  );
}

export default App;
