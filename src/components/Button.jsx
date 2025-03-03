import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  faHandsAslInterpreting
} from "@fortawesome/free-solid-svg-icons";

export function Button({ name, id, onClick, className = "" }) {
  return (
    <button className={`button blue ${className}`} id={id} onClick={onClick}>
      {name}
    </button>
  );
}

export function UploadButton({ onClick, className = "" }) {
  return (
    <button
      className={`upload-button ${className}`}
      id="openForm"
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faFileImport} />
      <span className="upload-text">Добавить фото</span>
    </button>
  );
}

export function UserButton({ onClick, className = "" }) {
  return (
    <button
      className={`upload-button ${className}`}
      id="openForm"
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faUserPen} />
      <span className="upload-text">Уточнить пользователя</span>
    </button>
  );
}

export function FiltrButton({ onClick, className = "" }) {
  return (
    <button
      className={`upload-button ${className}`}
      id="openForm"
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faFilterCircleXmark} />
      <span className="upload-text">Отфильтровать запросы</span>
    </button>
  );
}

export function AddUserButton({ onClick, className = "" }) {
  return (
    <button
      className={`upload-button ${className}`}
      id="openForm"
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faUserPlus} />
      <span className="upload-text">Добавить пользователя</span>
    </button>
  );
}

export function ChangePassButton({ onClick, className = "" }) {
  return (
    <button
      className={`upload-button ${className}`}
      id="openForm"
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faUnlock} />
      <span className="upload-text">Изменить пароль</span>
    </button>
  );
}

export function DeleteUserButton({ onClick, className = "" }) {
  return (
    <button
      className={`upload-button ${className}`}
      id="openForm"
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faUserSlash} />
      <span className="upload-text">Удалить пользователя</span>
    </button>
  );
}

export function NewConnectionButton({ onClick, className = "" }) {
  return (
    <button
      className={`upload-button ${className}`}
      id="startMenu"
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faCircleNodes} />
      <div className="buttonText">
        <span className="upload-text">Подключение</span>
      </div>
    </button>
  );
}

export function MalfunctionButton({ onClick, className = "" }) {
  return (
    <button
      className={`upload-button ${className}`}
      id="startMenu"
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faLandMineOn} />
      <div className="buttonText">
        <span className="upload-text">Неисправность</span>
      </div>
    </button>
  );
}

export function DisconnectButton({ onClick, className = "" }) {
  return (
    <button
      className={`upload-button ${className}`}
      id="startMenu"
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faUserSlash} />
      <div className="buttonText">
        <span className="upload-text">Отключение</span>
      </div>
    </button>
  );
}

export function StatusButton({ onClick, className = "" }) {
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

export function ChangeButton({ onClick, className = "" }) {
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

export function PPPoEButton({ onClick, className = "" }) {
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