import React from 'react';
import { Link } from 'react-router-dom';
import { MdLiveHelp } from 'react-icons/md';

function HelpButton({ to }) {
  return (
    <Link to={to} className={"upload-button"}>
      <MdLiveHelp size={28} />
      <span className="upload-text">Инструкция</span>
    </Link>
  );
}

export default HelpButton;