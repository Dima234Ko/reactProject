import React, { useState } from "react";
import { LinkButton } from "./Link";

import backIcon from "../img/back.png";
import logoIcon from "../img/logo.png";

const Header = ({ menuItems, showBurgerMenu = true, showBackButton = true }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      {showBackButton && (
        <button className="back-button" onClick={() => window.history.back()}>
          <img src={backIcon} alt="Кнопка назад" />
        </button>
      )}
      <a href="/user" className="logo-container">
        <img src={logoIcon} alt="Логотип" />
      </a>
      {showBurgerMenu && (
        <div className="burger-menu" onClick={toggleMenu}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      )}
      <div
        className="dropdown"
        style={{ display: isMenuOpen ? "block" : "none" }}
        onClick={closeMenu} // Закрыть меню, если нажали в любом месте меню
      >
        {menuItems.map((item) => (
          <LinkButton
            key={item.id}
            name={item.name}
            id={item.id}
            to={item.to}
            onClick={(e) => {
              e.stopPropagation();
              closeMenu(); // Закрытие меню при клике на ссылку
            }}
          />
        ))}
      </div>
    </header>
  );
};

export default Header;
