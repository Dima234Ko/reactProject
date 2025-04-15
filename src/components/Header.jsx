import React, { useState, useEffect, useRef } from 'react';
import { LinkButton } from './Button/Link';
import { BackButton } from './Button/BackButton';
import { MenuButton } from './Button/MenuButton';
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
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        burgerMenuRef.current &&
        !burgerMenuRef.current.contains(event.target)
      ) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      {showBackButton && <BackButton onClick={() => window.history.back()} />}

      <a className="logo-container">
        <img src={logoIcon} alt="Логотип" />
      </a>

      {showBurgerMenu && (
        <span ref={burgerMenuRef}>
          <MenuButton onClick={toggleMenu} />
        </span>
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
            onClick={closeMenu}
          />
        ))}
      </div>
    </header>
  );
};

export default Header;
