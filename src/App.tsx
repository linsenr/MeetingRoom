import React from "react";
import { Routes, Route } from "react-router-dom";
import Error from "./pages/Error/Error";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Login from "./pages/Login/Login";
import Main from "./pages/Main/Main";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/error" element={<Error />} />
        <Route path="/errorPage" element={<ErrorPage />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            //<RequireAuth>
            <Main />
            //</RequireAuth>
          }
        />
      </Routes>
    </>
  );
}

export default App;
