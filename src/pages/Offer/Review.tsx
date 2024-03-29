type ReviewProps = {
  review: {
    user: {
      avatarUrl: string;
      name: string;
    };
    rating: number;
    comment: string;
    date: string;
  };
  date: string;
}

const getReviewRatingStyle = (rating: number): React.CSSProperties => ({
  width: `${rating * 20}%`,
});

export const Review = ({ review, date }: ReviewProps) => (
  <li className="reviews__item" key={`${review.user.name}(${review.date})`}>
    <div className="reviews__user user">
      <div className="reviews__avatar-wrapper user__avatar-wrapper">
        <img
          className="reviews__avatar user__avatar"
          src={review.user.avatarUrl}
          width={54}
          height={54}
          alt="Reviews avatar"
        />
      </div>
      <span className="reviews__user-name">{review.user.name}</span>
    </div>
    <div className="reviews__info">
      <div className="reviews__rating rating">
        <div className="reviews__stars rating__stars">
          <span style={getReviewRatingStyle(review.rating)} />
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <p className="reviews__text">
        {review.comment}
      </p>
      <time className="reviews__time" dateTime={review.date}>
        {date}
      </time>
    </div>
  </li>
);

