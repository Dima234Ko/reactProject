import React from 'react';
import { useSelector } from 'react-redux';
import iconStatus from '../img/iconAction/iconStatus.png';
import iconPPPOE from '../img/iconAction/iconPPPOE.png';
import iconWiFi from '../img/iconAction/iconWiFi.png';
import iconWiFi2 from '../img/iconAction/iconWiFi2.png';
import iconInfo from '../img/iconAction/iconInfo.png';
import iconPhoto from '../img/iconAction/iconPhoto.png';
import iconCamera from '../img/iconAction/iconCamera.png';
import iconStatic from '../img/iconAction/iconStatic.png';

function ActionDisplay() {
  const page = useSelector((state) => state.task.page);

  const icons = (() => {
    switch (page) {
      case 'status':
        return [iconStatus];
      case 'pppoe':
        return [iconPPPOE];
      case 'wifi':
        return [iconWiFi];
      case 'wifi2':
        return [iconWiFi2];
      case 'info':
        return [iconInfo];
      case 'static':
        return [iconStatic];
      case 'end':
        return [iconPhoto];
      case 'camntu':
        return [iconCamera];
      default:
        return [];
    }
  })();

  return (
    <div className="icon-display-container">
      {icons.map((icon, index) => (
        <img
          key={index}
          src={icon}
          className="iconAction"
          alt="iconAction"
        />
      ))}
    </div>
  );
}

export default ActionDisplay;
