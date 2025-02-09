import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Authorization from "./pages/Authorization";
import Header from "./components/Header";
import Status from "./pages/Status";
import Pppoe from "./pages/PPPOE";

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

  // Массив пунктов меню, который передается в Header
  const menuItems = [
    { id: "home", name: "Главная", to: "/" },
    { id: "status", name: "Статус", to: "/status" },
    { id: "pppoe", name: "PPPoE", to: "/pppoe" },
  ];

  return (
    <>
      {/* Передаем пропсы showBackButton и showBurgerMenu */}
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
        </Routes>
      </div>
    </>
  );
}

export default App;
