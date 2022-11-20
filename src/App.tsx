import React, { useEffect } from "react";
import "assets/styles/css/App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Main from "layout/Main";
import axios from "axios";
import Panel from "pages/Panel";
import { adminActions, useAppDispatch } from "redux/store";
import News from "pages/Newss";

axios.defaults.baseURL =
  process.env.NODE_ENV === "production"
    ? "https://newstestcasebackend.vercel.app"
    : "http://localhost:10000";
function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function authCheckJwt() {
      try {
        const { data } = await axios.post("/auth/check/jwt");
        dispatch(adminActions.refresh(data));
      } catch (error) {
        navigate("/");
      }
    }
    authCheckJwt();
  }, []);

  useEffect(() => {
    async function authCheck() {
      const token = localStorage.getItem("token");
      try {
        await axios.post("/auth/check", {
          token,
        });
      } catch (error) {
        if (location.pathname !== "/") {
          navigate("/");
        }
      }
    }
    // authCheck();
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="/" element={<News />} />
          <Route path="/panel" element={<Panel />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
