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
import Work from "./pages/user/Work";
import Malfunction from "./pages/user/Malfunction";
import UserInfo from "./pages/user/UserInfo";
import {TaskButton} from "./components/Button";

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
  const hasWork = params.has("work");
  const hasLogin = params.has("login");

  // Логика отображения кнопки "назад" и бургер-меню
  const showBackButton = location.pathname !== "/" && !(params.get("work") === "1");
  const showBurgerMenu = location.pathname !== "/" && !(params.get("work") === "1");

  // Получаем данные из Redux
  const serialFromRedux = useSelector((state) => state.serial.serial);
  const regionFromRedux = useSelector((state) => state.region.region);
  const loginFromRedux = useSelector((state) => state.login.login);
  const workFromRedux = useSelector((state) => state.work.work);

  let userRootFromLocalStorage = "0";

  function updateUserRootFromLocalStorage() {
    userRootFromLocalStorage = JSON.parse(localStorage.getItem("authResult"));
  }

  // Функция для перенаправления на другие страницы
  const redirectTo = (pathname) => {
    updateUserRootFromLocalStorage();

    // Если отсутствует параметр редиректим
    if (!hasWork && ["/status", "/wifi", "/pppoe", "/malfunction", "/info" ].includes(pathname)) {
      return "/work";
    }

    if (!hasRegion && ["/status", "/wifi", "/pppoe", "/work", "/malfunction", "/info" ].includes(pathname)) {
      return "/region";
    }

    if (!hasSerial && (pathname === "/pppoe" || pathname === "/wifi" || pathname === "/info")) {
      return "/status";
    }

    
    if ((!hasLogin || !loginFromRedux === null) && (pathname === "/info")) {
      return "/pppoe";
    }

    // Логика редиректа на основе userRoot
    if (pathname === "/user" || pathname === "/log") {
      return userRootFromLocalStorage !== "1" ? "/region" : null;
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
          to: `/pppoe?region=${regionFromRedux}&work=${workFromRedux}&serial=${serialFromRedux}`,
        },
        {
          id: "wifiPage",
          name: "WiFi",
          to: `/wifi?region=${regionFromRedux}&work=${workFromRedux}&serial=${serialFromRedux}${
            loginFromRedux !== null ? `&login=${loginFromRedux}` : ''
          }`,
        },
        { id: "disable", name: "Демонтаж", to: "/disable" },
        { id: "userPage", name: "Пользователи", to: "/user" },
        { id: "logPage", name: "Логи", to: "/log" },
        { id: "settingsPage", name: "Настройки", to: "/settings" },
        { id: "homePage", name: "Выход", to: "/" },
      ];
    } else
      menuItems = [
        { id: "workPage", name: "Главная", to: "/work" },
        {
          id: "statusPage",
          name: "Статус",
          to: `/status?region=${regionFromRedux}`,
        },
        {
          id: "pppoePage",
          name: "PPPoE",
          to: `/pppoe?region=${regionFromRedux}&work=${workFromRedux}&serial=${serialFromRedux}`,
        },
        {
          id: "wifiPage",
          name: "WiFi",
          to: `/wifi?region=${regionFromRedux}&work=${workFromRedux}&serial=${serialFromRedux}${
            loginFromRedux !== null ? `&login=${loginFromRedux}` : ''
          }`,
        },
        { id: "settingsPage", name: "Настройки", to: "/settings" },
        { id: "homePage", name: "Выход", to: "/" },
      ];
  } else {
    if (userRootFromLocalStorage === "1") {
      menuItems = [
        ...(location.pathname !== "/status"
          ? [
              {
                id: "statusPage",
                name: "Статус",
                to: `/status?region=${regionFromRedux}`,
              },
            ]
          : []),
        ...(location.pathname !== "/disable"
          ? [
              {
                id: "disable",
                name: "Демонтаж",
                to: "/disable",
              },
            ]
          : []),
        { id: "userPage", name: "Пользователи", to: "/user" },
        { id: "logPage", name: "Логи", to: "/log" },
        { id: "settingsPage", name: "Настройки", to: "/settings" },
        { id: "homePage", name: "Выход", to: "/" },
      ];
    } else
    menuItems = [
        ...(location.pathname !== "/work"
        ? [
            {
              id: "workPage",
              name: "Главная",
              to: "/work",
            },
          ]
        : []),
        ...(location.pathname !== "/status" && 
          location.pathname !== "/work" && 
          location.pathname !== "/malfunction"
        ? [
            {
              id: "statusPage",
              name: "Статус",
              to: `/status?region=${regionFromRedux}`,
            },
          ]
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
          <Route path="/work" element={<Work/>} />
          <Route path="/malfunction" element={<Malfunction/>} />
          <Route path="/info" element={<UserInfo/>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <TaskButton
        onClick={() => console.log("click")}
        isHidden={location.pathname !== "/work"} 
      />
    </>
  );
}

export default App;
