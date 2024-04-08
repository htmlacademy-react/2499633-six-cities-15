import { OfferData } from '../../types';
import Card from '../card/card';


type OffersProps = {
  offers: OfferData[];
  onActiveOfferChangeHandler?: (offer: OfferData | undefined) => void;
  type: string;
}

export const OffersList = ({ offers, onActiveOfferChangeHandler, type }: OffersProps) => {
  const handleScroll = () => window.scrollTo({top: 0});

  return (

    offers.map((offer) => (
      <Card offer={offer} type={type} onActiveOfferChangeHandler={onActiveOfferChangeHandler} handleScroll={handleScroll} key={offer.id}/>
    ))
  );
};
