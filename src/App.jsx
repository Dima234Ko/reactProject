import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Authorization from "./pages/Authorization";
import Header from "./components/Header";
import Status from "./pages/user/Status";
import Pppoe from "./pages/user/PPPOE";
import Wifi from "./pages/user/Wifi";
import Settings from "./pages/user/Settings";
import Region from "./pages/user/Region";
import User from "./pages/admin/Accounts";
import Log from "./pages/admin/Log";
import Disabling from "./pages/user/Disabling";

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
  const hasRegion = params.has("region");

  // Логика отображения кнопки "назад" и бургер-меню
  const showBackButton = location.pathname !== "/";
  const showBurgerMenu = location.pathname !== "/";

  // Получаем serial из Redux
  const serialFromRedux = useSelector((state) => state.serial.serial);
  const regionFromRedux = useSelector((state) => state.region.region);

  let userRootFromLocalStorage = "0";

  function updateUserRootFromLocalStorage() {
    userRootFromLocalStorage = JSON.parse(localStorage.getItem("authResult"));
  }

  // Функция для перенаправления на другие страницы
  const redirectTo = (pathname) => {
    updateUserRootFromLocalStorage();

    // Если отсутствует region редиректим на /region
    if (
      !hasRegion &&
      [
        "/status",
        "/wifi",
        "/pppoe",
      ].includes(pathname)
    ) {
      return "/region";
    }

    // Если отсутствует serial и мы на странице /pppoe или /wifi, редиректим на /status
    if (!hasSerial && (pathname === "/pppoe" || pathname === "/wifi")) {
      return "/status";
    }

    // Логика редиректа на основе userRoot
    if (pathname === "/user" || pathname === "/log") {
      return userRootFromLocalStorage !== "1" ? "/status" : null;
    }
    if (
      pathname !== "/" &&
      !["1", "2", "3"].includes(userRootFromLocalStorage)
    ) {
      return "/";
    }
    return null;
  };

  const redirectPath = redirectTo(location.pathname);
  if (redirectPath) {
    return <Navigate to={redirectPath} replace />;
  }

  let menuItems = [];

  // Логика для меню на разных страницах
  if (location.pathname === "/settings" || location.pathname === "/region") {
    if (userRootFromLocalStorage === "1") {
      menuItems = [
        {
          id: "statusPage",
          name: "Статус",
          to: `/status?region=${regionFromRedux}`,
        },
        { id: "disable", name: "Демонтаж", to: "/disable" },
        { id: "userPage", name: "Пользователи", to: "/user" },
        { id: "logPage", name: "Логи", to: "/log" },
        { id: "homePage", name: "Выход", to: "/" },
      ];
    } else
      menuItems = [
        {
          id: "statusPage",
          name: "Статус",
          to: `/status?region=${regionFromRedux}`,
        },
        { id: "disable", name: "Демонтаж", to: "/disable" },
        { id: "homePage", name: "Выход", to: "/" },
      ];
  } else if (location.pathname !== "/" && hasSerial) {
    if (userRootFromLocalStorage === "1") {
      menuItems = [
        {
          id: "statusPage",
          name: "Статус",
          to: `/status?region=${regionFromRedux}`,
        },
        {
          id: "pppoePage",
          name: "PPPoE",
          to: `/pppoe?region=${regionFromRedux}&serial=${serialFromRedux}`,
        },
        {
          id: "wifiPage",
          name: "WiFi",
          to: `/wifi?region=${regionFromRedux}&serial=${serialFromRedux}`,
        },
        { id: "disable", name: "Демонтаж", to: "/disable" },
        { id: "userPage", name: "Пользователи", to: "/user" },
        { id: "logPage", name: "Логи", to: "/log" },
        { id: "settingsPage", name: "Настройки", to: "/settings" },
        { id: "homePage", name: "Выход", to: "/" },
      ];
    } else
      menuItems = [
        {
          id: "statusPage",
          name: "Статус",
          to: `/status?region=${regionFromRedux}`,
        },
        {
          id: "pppoePage",
          name: "PPPoE",
          to: `/pppoe?region=${regionFromRedux}&serial=${serialFromRedux}`,
        },
        {
          id: "wifiPage",
          name: "WiFi",
          to: `/wifi?region=${regionFromRedux}&serial=${serialFromRedux}`,
        },
        { id: "disable", name: "Демонтаж", to: "/disable" },
        { id: "settingsPage", name: "Настройки", to: "/settings" },
        { id: "homePage", name: "Выход", to: "/" },
      ];
  } else {
    if (userRootFromLocalStorage === "1") {
      menuItems = [
        ...(location.pathname !== "/status"
          ? [{
              id: "statusPage",
              name: "Статус",
              to: `/status?region=${regionFromRedux}`,
            }]
          : []),
        ...(location.pathname !== "/disable"
          ? [{
            id: "disable", name: "Демонтаж", to: "/disable"
            }]
        : []),
        { id: "userPage", name: "Пользователи", to: "/user" },
        { id: "logPage", name: "Логи", to: "/log" },
        { id: "settingsPage", name: "Настройки", to: "/settings" },
        { id: "homePage", name: "Выход", to: "/" },
      ];
    } else
      menuItems = [
        ...(location.pathname !== "/status"
          ? [{
              id: "statusPage",
              name: "Статус",
              to: `/status?region=${regionFromRedux}`,
            }]
          : []),
        ...(location.pathname !== "/disable"
          ? [{
            id: "disable", name: "Демонтаж", to: "/disable"
            }]
        : []),
        { id: "settingsPage", name: "Настройки", to: "/settings" },
        { id: "homePage", name: "Выход", to: "/" },
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
          <Route path="/log" element={<Log />} />
          <Route path="/disable" element={<Disabling />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
