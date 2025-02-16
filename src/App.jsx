import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux"; // Импортируем хук useSelector
import Authorization from "./pages/Authorization";
import Header from "./components/Header";
import Status from "./pages/user/Status";
import Pppoe from "./pages/user/PPPOE";
import Wifi from "./pages/user/Wifi";
import Settings from "./pages/user/Settings";
import Region from "./pages/user/Region";
import User from "./pages/admin/Accounts";

function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

function Main() {
  const location = useLocation();

  // Проверка наличия параметра serial в URL
  const params = new URLSearchParams(location.search);
  const hasSerial = params.has("serial");

  // Логика отображения кнопки "назад" и бургер-меню
  const showBackButton = location.pathname !== "/";
  const showBurgerMenu = location.pathname !== "/";

  // Получаем serial из Redux
  const serialFromRedux = useSelector((state) => state.serial.serial);

  let menuItems = [];

  const userRoot = () => {
    return false;
  };

  if (location.pathname === "/status" && userRoot()) {
    return <Navigate to="/user" replace />; // Перенаправление на "/user"
  }

  // Логика для меню на разных страницах
  if (location.pathname === "/settings" || location.pathname === "/region") {
    menuItems = [
      { id: "status", name: "Статус", to: "/status" },
      { id: "user", name: "Пользователи", to: "/user" },
      { id: "home", name: "Выход", to: "/" },
    ];
  } else if (location.pathname !== "/" && !hasSerial) {
    menuItems = [
      { id: "settings", name: "Настройки", to: "/settings" },
      { id: "user", name: "Пользователи", to: "/user" },
      { id: "home", name: "Выход", to: "/" },
    ];
  } else {
    menuItems = [
      { id: "status", name: "Статус", to: "/status" },
      { id: "pppoe", name: "PPPoE", to: `/pppoe?serial=${serialFromRedux}` },
      { id: "wifi", name: "WiFi", to: `/wifi?serial=${serialFromRedux}` },
      { id: "settings", name: "Настройки", to: "/settings" },
      { id: "user", name: "Пользователи", to: "/user" },
      { id: "home", name: "Выход", to: "/" },
    ];
  }

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
          <Route path="/settings" element={<Settings />} />
          <Route path="/region" element={<Region />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
