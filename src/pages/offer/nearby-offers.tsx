import { memo } from 'react';
import { OffersList } from '../../components/offers-list/offers-list';
import { OfferData } from '../../types';

type NearbyOffersProps = {
  offers: OfferData[];
  onActiveOfferChangeHandler: (offer: OfferData | undefined) => void;
}

const NearbyOffers = ({offers, onActiveOfferChangeHandler}: NearbyOffersProps) => (
  <div className="container">
    <section className="near-places places">
      <h2 className="near-places__title">
        Other places in the neighbourhood
      </h2>
      <div className="near-places__list places__list">
        <OffersList offers={offers} onActiveOfferChangeHandler={onActiveOfferChangeHandler} type="near-places"/>
      </div>
    </section>
  </div>
);

const memoizedNearbyOffers = memo(NearbyOffers);

export default memoizedNearbyOffers;
