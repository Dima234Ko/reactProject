import { Link } from 'react-router-dom';

export function LinkButton({ name, id, to }) {
  return (
    <Link to={to} className="button blue" id={id}>
      {name}
    </Link>
  );
}

