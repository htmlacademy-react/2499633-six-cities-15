import { Layout } from '../../components/layout/layout.tsx';
import { useEffect } from 'react';
import { loadFavorites } from '../../store/action.ts';
import { FavoritesList } from './favorites-list.tsx';
import { getFavorites } from '../../store/selector.ts';
import { Dispatch, State } from '../../types.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from '../main/spinner';


export const Favorites = () => {
  const dispatch: Dispatch = useDispatch();
  const favoriteOffers = useSelector(getFavorites);
  const favoritesIsLoading = useSelector((state: State) => state.isLoading.favorites);
  const favoritesIsFailed = useSelector((state: State) => state.isFailed.favorites);
  useEffect(() => {
    if (favoriteOffers === null) {
      dispatch(loadFavorites());
    }
  });

  return(
    <Layout>
      <>
        {favoriteOffers && favoriteOffers.length > 0 ?
          <div className="page__favorites-container container">
            <section className="favorites">
              <FavoritesList offers={favoriteOffers}/>
            </section>
            <footer className="footer container">
              <a className="footer__logo-link" href="main.html">
                <img
                  className="footer__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width={64}
                  height={33}
                />
              </a>
            </footer>
          </div>
          :
          <div className="page__favorites-container container">
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
              </div>
            </section>
          </div>}
        {favoritesIsLoading || favoritesIsFailed && <Spinner />}
      </>
    </Layout>
  );
};
