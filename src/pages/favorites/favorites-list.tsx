import { CityData, OfferData } from '../../types';
import Card from '../../components/card/card';
import { Link } from 'react-router-dom';
import { CITIES } from '../../const';

type FavoritesProps = {
  offers: OfferData[];
  onActiveOfferChangeHandler?: (offer: OfferData | undefined) => void;
}

export const FavoritesList = ({ offers, onActiveOfferChangeHandler}: FavoritesProps) => {
  const handleScroll = () => window.scrollTo({ top: 0 });
  const cities: CityData[] = CITIES;
  return (
    <ul className="favorites__list">
      {cities.map((city) => {
        if (offers.some((offer) => offer.city.name === city.name)) {
          return(
            <li className="favorites__locations-items" key={city.name}>
              <div className="favorites__locations locations locations--current">
                <div className="locations__item">
                  <Link className="locations__item-link" to={`/${city.name}`}>
                    <span>{city.name}</span>
                  </Link>
                </div>
              </div>
              <div className="favorites__places">
                {offers.filter((offer) => offer.city.name === city.name).map((offer) => (
                  <Card offer={offer} type='favorites' key={offer.id} handleScroll={handleScroll} onActiveOfferChangeHandler={onActiveOfferChangeHandler}/>
                ))}
              </div>
            </li>
          );
        }
      })}
    </ul>
  );
};

