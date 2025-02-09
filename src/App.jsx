import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useSelector } from "react-redux"; // Импортируем хук useSelector
import Authorization from "./pages/Authorization";
import Header from "./components/Header";
import Status from "./pages/Status";
import Pppoe from "./pages/PPPOE";
import Wifi from "./pages/Wifi";

function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

function Main() {
  // Получаем текущий путь
  const location = useLocation();

  // Логика отображения кнопки "назад" и бургер-меню
  const showBackButton = location.pathname !== "/";
  const showBurgerMenu = location.pathname !== "/";

  // Получаем serial из Redux
  const serialFromRedux = useSelector((state) => state.serial.serial); // Здесь предполагаем, что serial находится в state.serial


  // Массив пунктов меню, который передается в Header
  const menuItems = [
    { id: "home", name: "Главная", to: "/" },
    { id: "status", name: "Статус", to: "/status" },
    { id: "pppoe", name: "PPPoE", to: `/pppoe?serial=${serialFromRedux}`},
    { id: "wifi", name: "WiFi", to: `/wifi?serial=${serialFromRedux}`}
  ];

  return (
    <>
      <Header
        menuItems={menuItems}
        showBackButton={showBackButton}
        showBurgerMenu={showBurgerMenu}
      />
      <div id="app">
        <Routes>
          <Route path="/" element={<Authorization />} />
          <Route path="/status" element={<Status />} />
          <Route path="/pppoe" element={<Pppoe />} />
          <Route path="/wifi" element={<Wifi />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
