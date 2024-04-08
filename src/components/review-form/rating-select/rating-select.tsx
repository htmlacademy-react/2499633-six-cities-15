import { RatingStar } from './rating-star/rating-star';

type TProps = {
  onRatingChange: (rating: number) => void;
  selectedRating: number;
  isDisabled: boolean;
}
const ratingValues = [
  5,
  4,
  3,
  2,
  1
];

export const RatingSelect = ({ onRatingChange, selectedRating, isDisabled }: TProps) => (
  <>
    <label className="reviews__label form__label" htmlFor="review">
      Your review
    </label>
    <div className="reviews__rating-form form__rating">
      {ratingValues.map((value) => (<RatingStar value={value} onChange={onRatingChange} key={`rating-${value}`} isChecked={value === selectedRating} isDisabled={isDisabled}></RatingStar>))}
    </div>
  </>
);
