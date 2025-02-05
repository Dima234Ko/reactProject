// Button.jsx
export function Button({ name, id, onClick }) {
    return (
      <button className="button blue" id={id} onClick={onClick}>
        {name}
      </button>
    );
}
  