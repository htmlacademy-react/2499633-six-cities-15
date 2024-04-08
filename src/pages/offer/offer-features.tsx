import { SelectedOfferData } from '../../types';
import '../../string.extensions';

type Props = {
  features: SelectedOfferData;
};

export const OfferFeatures = ({ features }: Props) => {
  const FEATURES = {
    bedrooms: {
      text: 'Bedroom',
      value: features.bedrooms,
    },
    adults: {
      text: 'Adult',
      value: features.maxAdults,
    },
  };

  return (
    <ul className="offer__features">
      <li className='offer__feature offer__feature--entire'>{features.type.toCapitalized()}</li>
      {Object.entries(FEATURES).map(([key, value]) => (
        <li className={`offer__feature offer__feature--${key}`} key={key} >
          {value.text.toLowerCase() === 'adult' && 'Max '}{value.value} {value.text.toCapitalized()}{value.value > 1 && 's'}
        </li>
      ))}
    </ul>
  );
};
