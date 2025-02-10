import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useSelector } from "react-redux"; // Импортируем хук useSelector
import Authorization from "./pages/Authorization";
import Header from "./components/Header";
import Status from "./pages/Status";
import Pppoe from "./pages/PPPOE";
import Wifi from "./pages/Wifi";
import Settings from "./pages/Settings";
import Region from "./pages/Region";

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

  // Проверка наличия параметра serial в URL
  const params = new URLSearchParams(location.search);
  const hasSerial = params.has("serial");

  // Логика отображения кнопки "назад" и бургер-меню
  const showBackButton = location.pathname !== "/";
  const showBurgerMenu = location.pathname !== "/";

  // Получаем serial из Redux
  const serialFromRedux = useSelector((state) => state.serial.serial); // Здесь предполагаем, что serial находится в state.serial
  let menuItems = [];

switch (true) {
  case location.pathname === "/settings" || location.pathname === "/region":
    // Если на странице settings или region
    menuItems = [
      { id: "status", name: "Статус", to: "/status" },
      { id: "home", name: "Выход", to: "/" },
    ];
    break;

  case location.pathname !== "/" && !hasSerial:
    // Если нет serial в URL
    menuItems = [
      { id: "settings", name: "Настройки", to: "/settings" },
      { id: "home", name: "Выход", to: "/" },
    ];
    break;

  default:
    // Если serial есть в URL
    menuItems = [
      { id: "status", name: "Статус", to: "/status" },
      { id: "pppoe", name: "PPPoE", to: `/pppoe?serial=${serialFromRedux}` },
      { id: "wifi", name: "WiFi", to: `/wifi?serial=${serialFromRedux}` },
      { id: "settings", name: "Настройки", to: "/settings" },
      { id: "home", name: "Выход", to: "/" },
    ];
    break;
}



  return (
    <>
      <Header
        menuItems={menuItems}
        showBackButton={showBackButton}
        showBurgerMenu={showBurgerMenu} // Передаем флаг showBurgerMenu в Header
      />
      <div id="app">
        <Routes>
          <Route path="/" element={<Authorization />} />
          <Route path="/status" element={<Status />} />
          <Route path="/pppoe" element={<Pppoe />} />
          <Route path="/wifi" element={<Wifi />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/region" element={<Region />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
