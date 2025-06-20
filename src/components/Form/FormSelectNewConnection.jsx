import React from 'react';
import ExpressButton from '../Button/ExpressButton';

function FormSelectNewConnection({
  regionId,
  serial,
  work,
  navigate
}) {
  const handleInternetConnection = async () => {
    navigate(`/pppoe?region=${regionId}&work=${work}&serial=${serial}`);
  };

  const handleCameraConnection = async () => {
    navigate(`/camntu?region=${regionId}&work=${work}&serial=${serial}`);
  };

  const handleStaticConnection = async () => {
    navigate(`/static?region=${regionId}&work=${work}&serial=${serial}`);
  };

  return (
    <div>
      <h2>Подтвердите</h2>
      <pre>Выберите тип подключения</pre>
      <div className="input-container">
        <ExpressButton
          onClick={handleInternetConnection}
          text="Интернет PPPoE"
          closeButton={false}
        />
        <ExpressButton
          onClick={handleStaticConnection}
          text="Интернет Static IP"
          closeButton={false}
        />
        <ExpressButton
          onClick={handleCameraConnection}
          text="Видеонаблюдение"
          closeButton={false}
        />
        <br></br>
      </div>
    </div>
  );
}

export default FormSelectNewConnection;
