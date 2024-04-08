import { Link } from 'react-router-dom';
import { Addresses } from '../../const';
import { getFavorites } from '../../store/selector';
import { Dispatch, State } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/action';
import { setAuthStatus } from '../../store/slice/api-slice';
export const AuthUser = () => {
  const favoriteOffers = useSelector(getFavorites);
  const dispatch: Dispatch = useDispatch();
  const userEmail = useSelector((state: State) => state.api.userData?.email);
  const userAvatar = useSelector((state: State) => state.api.userData?.avatarUrl);
  const pathname: string = location.pathname;
  const isFavorites = new RegExp(Addresses.Favorites);
  const handleSignOut = () => {
    dispatch(setAuthStatus('NO_AUTH'));
    dispatch(logout());
  };
  return (
    <ul className="header__nav-list">
      <li className="header__nav-item user">
        <Link
          className="header__nav-link header__nav-link--profile"
          to={Addresses.Favorites}
        >
          <div className="header__avatar-wrapper user__avatar-wrapper">
            <img
              className="header__avatar user__avatar"
              src={userAvatar} alt=""
            />
          </div>
          <span className="header__user-name user__name">
            {userEmail}
          </span>
          {favoriteOffers && favoriteOffers.length > 0 && <span className="header__favorite-count">{favoriteOffers.length}</span>}
        </Link>
      </li>
      <li className="header__nav-item">
        <Link className="header__nav-link" to={isFavorites.test(pathname) ? Addresses.Login : Addresses.Main} onClick={handleSignOut}>
          <span className="header__signout">Sign out</span>
        </Link>
      </li>
    </ul>
  );
};
