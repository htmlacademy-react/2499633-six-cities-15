import { Link, useLocation, useParams } from 'react-router-dom';
import { Addresses } from '../../const';
import { useEffect } from 'react';
import { loadAuthStatus, loadFavorites, loadOffers } from '../../store/action';
import { AuthStatus, Dispatch, State } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { AuthUser } from './auth-user';
import { NoAuthUser } from './no-auth-user';
import { getAuthStatus } from '../../store/selector';

type LayoutProps = {
  children: JSX.Element;
}

export const Layout = ({ children }: LayoutProps) => {
  const dispatch: Dispatch = useDispatch();
  const authStatus: AuthStatus = useSelector(getAuthStatus);
  const isAuth = authStatus === 'AUTH';
  const location = useLocation();
  const params = useParams();
  const paramPathname = Object.values(params)[0] as string;
  const pathname: string = location.pathname.replace(paramPathname, '');
  const isEmptyMain = useSelector((state: State) => state.offers)?.length === 0 && pathname === '/';
  const isEmptyFavorites = useSelector((state: State) => state.favoriteOffers)?.length === 0 && pathname === '/favorites';
  const classNamesMap: { [key: string]: { wrapper: string; main: string } } = {
    '/': {
      wrapper: 'page page--gray page--main',
      main: 'page__main page__main--index',
    },
    '/favorites': {
      wrapper: 'page',
      main: 'page__main page__main--favorites',
    },
    '/offer/': {
      wrapper: 'page',
      main: 'page__main page__main--offer',
    },
    '/login': {
      wrapper: 'page page--gray page--login',
      main: 'page__main page__main--login'
    }
  };
  const getClassName = () => {
    if (isEmptyMain) {
      return {wrapper: 'page page--gray page--main', main: 'page__main page__main--index page__main--index-empty'};
    }
    if (isEmptyFavorites) {
      return {wrapper: 'page page--favorites-empty', main: 'page__main page__main--favorites page__main--favorites-empty'};
    }
    return classNamesMap[pathname] || classNamesMap['/'];
  };

  const { wrapper, main } = getClassName();

  useEffect(() => {
    dispatch(loadOffers());
  }, []);

  useEffect(() => {
    if (authStatus === 'UNKNOWN') {
      dispatch(loadAuthStatus());
      return;
    }
    if (authStatus === 'AUTH') {
      dispatch(loadFavorites());
    }
  }, [authStatus]);

  return (
    <div className={wrapper}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to={Addresses.Main} className="header__logo-link header__logo-link--active">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width={81}
                  height={41}
                />
              </Link>
            </div>
            {pathname !== '/login' &&
              <nav className="header__nav">
                {isAuth ? <AuthUser /> : <NoAuthUser />}
              </nav>}
          </div>
        </div>
      </header>
      <main className={main}>
        {children}
      </main>
    </div>

  );
};


