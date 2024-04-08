import { OfferData } from '../../types';
import Card from '../card/card';


type OffersProps = {
  offers: OfferData[];
  onActiveOfferChangeHandler?: (offer: OfferData | undefined) => void;
  type: string;
  slice?: number;
}

export const OffersList = ({ offers, onActiveOfferChangeHandler, type, slice }: OffersProps) => {
  const handleScroll = () => window.scrollTo({top: 0});

  return (

    offers.slice(0, slice).map((offer) => (
      <Card offer={offer} type={type} onActiveOfferChangeHandler={onActiveOfferChangeHandler} handleScroll={handleScroll} key={offer.id}/>
    ))
  );
};
