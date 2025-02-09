import nextIcon from "../img/next.svg";

// Button.jsx
export function Button({ name, id, onClick }) {
  return (
    <button className="button blue" id={id} onClick={onClick}>
      {name}
    </button>
  );
}

export function NextButton() {
  return (
    <button className="next-button">
      <img src={nextIcon} alt="Кнопка назад" />
    </button>
  );
}
