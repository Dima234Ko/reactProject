import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileImport,
  faUserSlash,
  faUnlock,
  faUserPen,
  faUserPlus,
  faFilterCircleXmark,
  faCircleNodes,
  faLandMineOn,
  faUserCheck,
  faNetworkWired,
  faHandsAslInterpreting,
  faChartLine,
} from '@fortawesome/free-solid-svg-icons';

export function Button({
  name,
  id,
  onClick,
  className = '',
  disabled = false,
}) {
  return (
    <button
      className={`button blue ${className}`}
      id={id}
      onClick={onClick}
      disabled={disabled}
    >
      {name}
    </button>
  );
}

export function UploadButton({ onClick, className = '' }) {
  return (
    <button className={`upload-button ${className}`} onClick={onClick}>
      <FontAwesomeIcon icon={faFileImport} />
      <span className="upload-text">Добавить фото</span>
    </button>
  );
}

export function UserButton({ onClick, className = '' }) {
  return (
    <button className={`upload-button ${className}`} onClick={onClick}>
      <FontAwesomeIcon icon={faUserPen} />
      <span className="upload-text">Уточнить пользователя</span>
    </button>
  );
}

export function FiltrButton({ onClick, className = '' }) {
  return (
    <button className={`upload-button ${className}`} onClick={onClick}>
      <FontAwesomeIcon icon={faFilterCircleXmark} />
      <span className="upload-text">Отфильтровать запросы</span>
    </button>
  );
}

export function AddUserButton({ onClick, className = '' }) {
  return (
    <button className={`upload-button ${className}`} onClick={onClick}>
      <FontAwesomeIcon icon={faUserPlus} />
      <span className="upload-text">Добавить пользователя</span>
    </button>
  );
}

export function ChangeEditUser({ onClick, className = '' }) {
  return (
    <button className={`upload-button ${className}`} onClick={onClick}>
      <FontAwesomeIcon icon={faUnlock} />
      <span className="upload-text">Изменить пользователя</span>
    </button>
  );
}

export function DeleteUserButton({ onClick, className = '' }) {
  return (
    <button className={`upload-button ${className}`} onClick={onClick}>
      <FontAwesomeIcon icon={faUserSlash} />
      <span className="upload-text">Запретить доступ</span>
    </button>
  );
}

export function NewConnectionButton({ onClick, className = '', disabled }) {
  return (
    <button
      className={`upload-button ${className} ${disabled ? 'disabled' : ''}`}
      id="startMenu"
      onClick={onClick}
      disabled={disabled}
    >
      <FontAwesomeIcon icon={faCircleNodes} />
      <div className="buttonText">
        <span className="upload-text">Подключение</span>
      </div>
    </button>
  );
}

export function MalfunctionButton({ onClick, className = '', disabled }) {
  return (
    <button
      className={`upload-button ${className} ${disabled ? 'disabled' : ''}`}
      id="startMenu"
      onClick={onClick}
      disabled={disabled}
    >
      <FontAwesomeIcon icon={faLandMineOn} />
      <div className="buttonText">
        <span className="upload-text">Неисправность</span>
      </div>
    </button>
  );
}

export function DisconnectButton({ onClick, className = '', disabled }) {
  return (
    <button
      className={`upload-button ${className} ${disabled ? 'disabled' : ''}`}
      id="startMenu"
      onClick={onClick}
      disabled={disabled}
    >
      <FontAwesomeIcon icon={faUserSlash} />
      <div className="buttonText">
        <span className="upload-text">Отключение</span>
      </div>
    </button>
  );
}

export function StatusButton({ onClick, className = '' }) {
  return (
    <button
      className={`upload-button ${className}`}
      id="startMenu"
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faUserCheck} />
      <div className="buttonText">
        <span className="upload-text">Статус NTU</span>
      </div>
    </button>
  );
}

export function ChangeButton({ onClick, className = '' }) {
  return (
    <button
      className={`upload-button ${className}`}
      id="startMenu"
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faHandsAslInterpreting} />
      <div className="buttonText">
        <span className="upload-text">Замена NTU</span>
      </div>
    </button>
  );
}

export function PPPoEButton({ onClick, className = '' }) {
  return (
    <button
      className={`upload-button ${className}`}
      id="startMenu"
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faNetworkWired} />
      <div className="buttonText">
        <span className="upload-text">PPPoE</span>
      </div>
    </button>
  );
}

export function TaskButton({ onClick, text }) {
  return (
    <button
      className={`upload-button action-btn`}
      id="activeButton"
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faChartLine} />
      <div className="buttonText">
        <span className="upload-text">{text}</span>
      </div>
    </button>
  );
}

export function ExpressButton({ onClick, text, closeButton }) {
  return (
    <button
      className="button blue"
      id={closeButton ? 'activeButton' : 'false'}
      onClick={onClick}
    >
      <div className="buttonText">
        <span className="upload-text">{text}</span>
      </div>
    </button>
  );
}
