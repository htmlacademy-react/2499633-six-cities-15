type props = {
  value: number;
  onChange: (value: number) => void;
  isChecked: boolean;
  isDisabled: boolean;
}


const ratingToLabel: { [key: number]: string } = {
  5: 'perfect',
  4: 'good',
  3: 'not bad',
  2: 'badly',
  1: 'terribly',
};
export const RatingStar = ({ value, onChange, isChecked, isDisabled}: props) => {
  const ratingText = `${value}-stars`;

  return(
    <>
      <input
        onChange={() => (onChange(value))}
        className="form__rating-input visually-hidden"
        name="rating"
        defaultValue={value}
        id={ratingText}
        type="radio"
        checked={isChecked}
        disabled={isDisabled}
      />
      <label
        htmlFor={ratingText}
        className="reviews__rating-label form__rating-label"
        title={ratingToLabel[value]}
      >
        <svg className="form__star-image" width={37} height={33}>
          <use xlinkHref="#icon-star" />
        </svg>
      </label>
    </>
  );
};
