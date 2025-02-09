import { Link } from "react-router-dom";
import nextIcon from "../img/next.svg";

export function LinkButton({ name, id, to }) {
  return (
    <Link to={to} className="button blue" id={id}>
      {name}
    </Link>
  );
}

export function NextButton({ to }) {
  return (
    <Link to={to} className="next-button">
      <img src={nextIcon} alt="Кнопка вперед" />
    </Link>
  );
}
