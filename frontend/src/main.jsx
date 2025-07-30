import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Login from "./components/Login.jsx";
import Home from "./components/Home.jsx";
import { HashRouter, Routes, Route } from "react-router-dom";

import Test from "./components/Test.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="" Component={Login}></Route>
        <Route path="/home" Component={Home}></Route>
        <Route path="/test" Component={Test}></Route>
      </Routes>
    </HashRouter>
  </StrictMode>
);
