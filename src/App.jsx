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
import { TaskButton } from "./components/Button";

function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

function Main() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const { pathname } = location;

  // Параметры из URL
  const hasSerial = params.has("serial");
  const hasRegion = params.has("region");
  const hasWork = params.has("work");
  const hasLogin = params.has("login");
  const isWorkParam = params.get("work") !== "1"; // Исправлено определение

  // Состояние UI
  const showBackButton = pathname !== "/";
  const showBurgerMenu = pathname !== "/";

  // Redux state
  const serialFromRedux = useSelector((state) => state.serial.serial);
  const regionFromRedux = useSelector((state) => state.region.region);
  const loginFromRedux = useSelector((state) => state.login.login);
  const workFromRedux = useSelector((state) => state.work.work);

  // Получение userRoot из localStorage
  const getUserRoot = () => JSON.parse(localStorage.getItem("authResult")) || "0";
  const userRoot = getUserRoot();

  // Функция редиректа
  const getRedirectPath = (pathname) => {
    const needWork = ["/status", "/wifi", "/pppoe", "/malfunction", "/info"];
    const needRegion = [...needWork, "/work"];
    const needSerial = ["/pppoe", "/wifi", "/info"];
    const rootOnly = ["/user", "/log"];

    if (!hasWork && needWork.includes(pathname)) return "/work";
    if (!hasRegion && needRegion.includes(pathname)) return "/region";
    if (!hasSerial && needSerial.includes(pathname)) return "/status";
    if ((!hasLogin) && pathname === "/info") return "/pppoe";
    
    if (rootOnly.includes(pathname) && userRoot !== "1") return "/region";
    if (pathname !== "/" && !["1", "2", "3"].includes(userRoot)) return "/";
    
    return null;
  };

  // Функция получения пунктов меню
  const getMenuItems = () => {
    const isRoot = userRoot === "1";
    const isSettingsOrRegion = pathname === "/settings" || pathname === "/region";
    const isNotRootPage = pathname !== "/";

    return [
      {
        id: "workPage",
        name: "Главная",
        to: isSettingsOrRegion && isRoot ? "/disable" : "/work",
        show: !isSettingsOrRegion || (isSettingsOrRegion && isRoot) || pathname !== "/work"
      },
      {
        id: "statusPage",
        name: "Статус",
        to: `/status?region=${regionFromRedux}`,
        show: (isNotRootPage && hasSerial) || 
              (pathname !== "/status" && !["/work", "/malfunction"].includes(pathname))
      },
      {
        id: "pppoePage",
        name: "PPPoE",
        to: `/pppoe?region=${regionFromRedux}&work=${workFromRedux}&serial=${serialFromRedux}`,
        show: isNotRootPage && hasSerial && isWorkParam
      },
      {
        id: "wifiPage",
        name: "WiFi",
        to: `/wifi?region=${regionFromRedux}&work=${workFromRedux}&serial=${serialFromRedux}${loginFromRedux ? `&login=${loginFromRedux}` : ''}`,
        show: isNotRootPage && hasSerial && isWorkParam
      },
      {
        id: "userPage",
        name: "Пользователи",
        to: "/user",
        show: isRoot
      },
      {
        id: "logPage",
        name: "Логи",
        to: "/log",
        show: isRoot
      },
      {
        id: "settingsPage",
        name: "Настройки",
        to: "/settings",
        show: !isSettingsOrRegion || (isNotRootPage && (!hasSerial || isWorkParam))
      },
      {
        id: "homePage",
        name: "Выход",
        to: "/",
        show: true
      }
    ].filter(item => item.show);
  };

  const redirectPath = getRedirectPath(pathname);
  if (redirectPath) {
    return <Navigate to={redirectPath} replace />;
  }

  const menuItems = getMenuItems();

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
          <Route path="/work" element={<Work />} />
          <Route path="/malfunction" element={<Malfunction />} />
          <Route path="/info" element={<UserInfo />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      {pathname === "/work" && (
        <TaskButton
          onClick={() => console.log("click")}
          text="Активная задача"
        />
      )}
      {(pathname === "/status" || pathname === "/pppoe" || pathname === "/wifi" || pathname === "/repalcment")&& isWorkParam && (
        <TaskButton
          onClick={() => console.log("click")}
          text="Завершить задачу"
        />
      )}
    </>
  );
}

export default App;