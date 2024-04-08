import { FormEvent, useState } from 'react';
import { RatingSelect } from './rating-select/rating-select';
import { Dispatch, State } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { postComment } from '../../store/action';
import { COMMENT_REQUIREMENTS } from '../../const';
import { Spinner } from '../../pages/main/spinner';

type ReviewFormProps = {
  id: string;
}

export const ReviewForm = ({id}: ReviewFormProps) => {
  const [values, setValues] = useState({
    rating: 0,
    comment: '',
  });

  const [isLoading, setLoading] = useState(false);
  const handleRating = (rating: number) => {
    setValues((prev) => ({
      ...prev,
      rating,
    }));
  };


  const reviewIsFailed = useSelector((state: State) => state.isFailed.review);
  const dispatch: Dispatch = useDispatch();
  const handlePostReview = async(evt: FormEvent) => {
    try {
      evt.preventDefault();
      setLoading(true);
      const {payload} = await dispatch(postComment({ ...values, id }));
      if (payload) {
        setValues({
          rating: 0,
          comment: '',
        });
      }
    } finally {
      setLoading(false);
    }

  };

  const { MIN_LENGTH, MAX_LENGTH } = COMMENT_REQUIREMENTS;

  const isValidReview = values.rating !== 0 && values.comment.length >= MIN_LENGTH && values.comment.length <= MAX_LENGTH;

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={(evt) => {
      handlePostReview(evt);
    }}
    >
      <RatingSelect onRatingChange={handleRating} selectedRating={values.rating} isDisabled={isLoading}></RatingSelect>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={(e) => (
          setValues((prev) => ({
            ...prev,
            comment: e.target.value,
          })))}
        value={values.comment}
        disabled={isLoading}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
                      To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe
                      your stay with at least{' '}
          <b className="reviews__text-amount">50 characters</b>.
          <br/>
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isValidReview || isLoading}
        >
                      Submit
        </button>
      </div>
      {reviewIsFailed && <Spinner />}
    </form>
  );
};
