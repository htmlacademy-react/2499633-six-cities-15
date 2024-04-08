import { Link } from 'react-router-dom';
import { Addresses } from '../../const';

export const NoAuthUser = () => (
  <li className="header__nav-item user">
    <Link className="header__nav-link header__nav-link--profile" to={Addresses.Login}>
      <div className="header__avatar-wrapper user__avatar-wrapper">
      </div>
      <span className="header__login">Sign in</span>
    </Link>
  </li>
);
