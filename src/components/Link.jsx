import { Link } from "react-router-dom";
import nextIcon from "../img/next.svg";

export function LinkButton({ name, id, to }) {
  return (
    <Link to={to} className="button blue" id={id}>
      {name}
    </Link>
  );
}

export function NextButton({ to, disabled }) {
  return (
    <Link
      to={to}
      className={`next-button ${disabled ? "disabled" : ""}`}
      aria-disabled={disabled}
    >
      <img src={nextIcon} alt="Кнопка вперед" />
    </Link>
  );
}
