import React, { useState } from "react";
import { LinkButton } from "./Link";

// Импортируем картинки из папки src/img
import backIcon from "../img/back.png";
import logoIcon from "../img/logo.png";

const Header = ({ menuItems }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState); // Переключаем состояние меню
  };

  return (
    <header className="header">
      {/* Кнопка назад */}
      <button className="back-button" onClick={() => window.history.back()}>
        <img src={backIcon} alt="Кнопка назад" />
      </button>

      {/* Логотип по центру */}
      <a href="/user" className="logo-container">
        <img src={logoIcon} alt="Логотип" />
      </a>

      {/* Бургер-меню справа */}
      <div className="burger-menu" onClick={toggleMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      {/* Список меню (выпадает при открытии бургер-меню) */}
      <div
        className="dropdown"
        style={{ display: isMenuOpen ? "block" : "none" }}
      >
        {menuItems.map((item) => (
          <LinkButton
            key={item.id}
            name={item.name}
            id={item.id}
            to={item.to}
          />
        ))}
      </div>
    </header>
  );
};

export default Header;
