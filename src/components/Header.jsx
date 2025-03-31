import React, { useState, useEffect, useRef } from 'react';
import { LinkButton } from './Link';

import backIcon from '../img/Back.svg';
import menuIcon from '../img/Menu.svg';
import logoIcon from '../img/logo.png';

const Header = ({
  menuItems,
  showBurgerMenu = true,
  showBackButton = true,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const burgerMenuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Эффект для закрытия меню при клике в любом месте
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Проверяем, что клик не произошел на меню и кнопке бургера
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        burgerMenuRef.current &&
        !burgerMenuRef.current.contains(event.target)
      ) {
        closeMenu();
      }
    };

    // Добавляем обработчик клика на весь документ
    document.addEventListener('mousedown', handleClickOutside);

    // Очищаем обработчик при размонтировании компонента
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      {showBackButton && (
        <button className="back-button" onClick={() => window.history.back()}>
          <img src={backIcon} alt="Кнопка назад" />
        </button>
      )}
      <a className="logo-container">
        <img src={logoIcon} alt="Логотип" />
      </a>
      {showBurgerMenu && (
        <div className="burger-menu" onClick={toggleMenu} ref={burgerMenuRef}>
          <img src={menuIcon} alt="Меню" />
        </div>
      )}
      <div
        className="dropdown"
        style={{ display: isMenuOpen ? 'block' : 'none' }}
        ref={menuRef}
        onClick={closeMenu}
      >
        {menuItems.map((item) => (
          <LinkButton
            key={item.id}
            name={item.name}
            id={item.id}
            to={item.to}
            onClick={() => {
              closeMenu();
            }}
          />
        ))}
      </div>
    </header>
  );
};

export default Header;
