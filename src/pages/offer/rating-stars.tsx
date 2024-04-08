import { handleStars } from '../../const';

export const RatingStars = ({ rating }: { rating: number }) => {
  const ratingStyle = { width: '80%' };
  ratingStyle.width = handleStars(rating);

  return (
    <div className="offer__rating rating">
      <div className="offer__stars rating__stars">
        <span style={ratingStyle} />
        <span className="visually-hidden">Rating</span>
      </div>
      <span className="offer__rating-value rating__value">{rating}</span>
    </div>
  );
};
