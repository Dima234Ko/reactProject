import React from 'react';
import { ExpressButton } from '../Button/ExpressButton';

export function FormSelectNewConnection({ regionId, serial, work, dispatch, navigate, closeForm }) {


  const handleInternetConnection = async () => {
      navigate(`/pppoe?region=${regionId}&work=${work}&serial=${serial}`);
  };

  const handleCameraConnection = async () => {
    navigate(`/status?region=${regionId}&work=${work}&serial=${serial}`);
  };

  return (
    <div>
      <h2>Подтвердите</h2>
      <pre>Выберите действие</pre>
      <div className="input-container">
        <ExpressButton
          onClick={handleInternetConnection}
          text="Подключение интернета"
          closeButton={false}
        />
        <ExpressButton
          onClick={handleCameraConnection}
          text="Подключение камеры"
          closeButton={false}
        />
        <ExpressButton onClick={closeForm} text="Отмена" closeButton={true} />
      </div>
    </div>
  );
}