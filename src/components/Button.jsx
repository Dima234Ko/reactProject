import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImport } from "@fortawesome/free-solid-svg-icons";
import { faUserPen } from "@fortawesome/free-solid-svg-icons"; 

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