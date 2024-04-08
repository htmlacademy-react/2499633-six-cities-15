import { OffersList } from '../../components/offers-list/offers-list';
import { OfferData, CityData, Dispatch, State } from '../../types';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { SortOptions } from './sort-options/sort-options';
import Map from '../../components/map/map';
import { setCity } from '../../store/reducer';
import { SORT_BY_VALUES, CITIES } from '../../const';
import { Spinner } from './spinner';
import { MainEmpty } from './main-empty';
import { getOffersByCity, getSelectedCity } from '../../store/selector';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';


export const MainContent = () => {
  const dispatch: Dispatch = useDispatch();
  const params = useParams();
  const cities: CityData[] = CITIES;
  const selectedCity: CityData = useSelector(getSelectedCity);
  const cityFromParams = cities.find((city) => city.name === params.city);
  const offersIsLoading = useSelector((state: State) => state.isLoading.offers);
  const navigate = useNavigate();

  useEffect(() => {
    if (cityFromParams === undefined) {
      navigate('*');
    } else if (cityFromParams && cityFromParams !== selectedCity) {
      dispatch(setCity(cityFromParams));
    }
  }, [cityFromParams, cities]);


  const filteredOffers: OfferData[] = useSelector(getOffersByCity);

  const [sortState, setSortState] = useState({
    sortIsOpened: false,
    sortBy: 'Popular',
  });
  const sortVisibilityHandler = useCallback(() => setSortState((prev) => ({
    ...prev,
    sortIsOpened: !prev.sortIsOpened,
  })), []);
  const sortByHandler = useCallback((sortBy: string) => setSortState((prev) => ({
    ...prev,
    sortBy
  })), []);
  const sortedOffers = useMemo(() =>
    filteredOffers?.sort((a, b) => {
      switch (sortState.sortBy) {
        case 'Price: low to high':
          return a.price - b.price;
        case 'Price: high to low':
          return b.price - a.price;
        case 'Top rated first':
          return b.rating - a.rating;
        default:
          return 0;
      }
    }),
  [sortState, filteredOffers]);

  const [activeOffer, setActiveOffer] = useState<OfferData | undefined>(undefined);
  const onActiveOfferChangeHandler = useCallback((offer: OfferData | undefined) => setActiveOffer(offer), []);
  const activePoints = useMemo(() => sortedOffers?.map(({ id, location: { latitude, longitude } }) => ({
    id,
    latitude,
    longitude,
  })), [sortedOffers]);

  const selectedPoint = activeOffer !== undefined ? {
    id: activeOffer.id,
    latitude: activeOffer.location.latitude,
    longitude: activeOffer.location.longitude,
  } : undefined;

  return (
    <div className="cities">
      {offersIsLoading && <Spinner/>}
      {sortedOffers && sortedOffers.length !== 0 ?
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{sortedOffers.length} Place{sortedOffers.length > 1 && 's' } to stay in {selectedCity.name}</b>
            <form className="places__sorting" action="#" method="get" >
              <span className="places__sorting-caption">Sort by{' '}</span>
              <span className="places__sorting-type" tabIndex={0} onClick={() => sortVisibilityHandler()}>
                {sortState.sortBy}
                <svg className="places__sorting-arrow" width={7} height={4}>
                  <use xlinkHref="#icon-arrow-select" />
                </svg>
              </span>
              <SortOptions
                sortIsOpened={sortState.sortIsOpened}
                sortVisibilityHandler={sortVisibilityHandler}
                sortBy={sortState.sortBy}
                sortByValues={SORT_BY_VALUES}
                sortByHandler={sortByHandler}
              />
            </form>
            <div className="cities__places-list places__list tabs__content">
              <OffersList onActiveOfferChangeHandler={onActiveOfferChangeHandler} offers={sortedOffers} type='cities' />
            </div>
          </section>
          <section className='cities__right-section'>
            {<Map city={selectedCity} points={activePoints} selectedPoint={selectedPoint} className='cities__map map'/>}
          </section>
        </div> : sortedOffers && <MainEmpty city={selectedCity ? selectedCity.name : 'Unknown'}/>}
    </div>
  );
};
