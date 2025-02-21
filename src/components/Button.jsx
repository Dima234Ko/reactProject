import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileImport,
  faUserSlash,
  faUnlock,
  faUserPen,
  faUserPlus,
  faFilterCircleXmark,
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
