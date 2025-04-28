import { Link } from 'react-router-dom';

function NextButton({ to, disabled }) {
  return (
    <Link to={to} className="button green" disabled={disabled}>
      Далее
    </Link>
  );
}

export default NextButton;
