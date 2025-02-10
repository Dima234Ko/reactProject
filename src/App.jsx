import React from "react";
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

  // Проверка наличия параметра serial в URL
  const params = new URLSearchParams(location.search);
  const hasSerial = params.has("serial");

  // Логика отображения кнопки "назад" и бургер-меню
  const showBackButton = location.pathname !== "/";
  const showBurgerMenu = location.pathname !== "/" && hasSerial; // Бургер-меню показываем только если serial есть в URL

  // Получаем serial из Redux
  const serialFromRedux = useSelector((state) => state.serial.serial); // Здесь предполагаем, что serial находится в state.serial

  // Массив пунктов меню, который передается в Header
  const menuItems = [
    { id: "home", name: "Главная", to: "/" },
    { id: "status", name: "Статус", to: "/status" },
    { id: "pppoe", name: "PPPoE", to: `/pppoe?serial=${serialFromRedux}` },
    { id: "wifi", name: "WiFi", to: `/wifi?serial=${serialFromRedux}` }
  ];

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
        </Routes>
      </div>
    </>
  );
}

export default App;
