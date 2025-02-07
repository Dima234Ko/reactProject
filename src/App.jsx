import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Authorization from "./pages/Authorization";
import Header from "./components/Header";
import Status from "./pages/Status";
import Pppoe from "./pages/PPPOE";

function App() {
  // Массив пунктов меню, который передается в Header
  const menuItems = [
    { id: "home", name: "Главная", to: "/" },
    { id: "status", name: "Статус", to: "/status" },
    { id: "pppoe", name: "PPPoE", to: "/pppoe" },
  ];

  return (
    <Router>
      <Header menuItems={menuItems} />
      <div id="app">
        <Routes>
          <Route path="/" element={<Authorization />} />
          <Route path="/status" element={<Status />} />
          <Route path="/pppoe" element={<Pppoe />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
