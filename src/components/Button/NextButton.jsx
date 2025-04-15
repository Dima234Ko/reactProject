import { Link } from 'react-router-dom';

export function NextButton({ to, disabled }) {
    return (
      <Link
        to={to}
        className="button green" disabled={disabled}
      >
        Далее
      </Link>
    );
  }
  