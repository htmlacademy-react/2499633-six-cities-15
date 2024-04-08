import { MouseEventHandler, memo } from 'react';
import { Addresses, handleStars } from '../../const.ts';
import { Dispatch, OfferData } from '../../types.tsx';
import BookmarkButton from '../bookmark-button/bookmark-button.tsx';
import { toggleFavorite } from '../../store/action.ts';
import { getAuthStatus } from '../../store/selector.ts';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import '../../string.extensions.ts';

type CardProps = {
  offer: OfferData;
  type: string;
  onActiveOfferChangeHandler?: (offer: OfferData | undefined) => void;
  handleScroll: () => void;
}


const Card = ({ offer, type, onActiveOfferChangeHandler, handleScroll }: CardProps) => {
  const dispatch: Dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(getAuthStatus) === 'AUTH';
  const ratingStyle = { width: '80%' };
  const handleBookmark: MouseEventHandler = (evt) => {
    evt.preventDefault();
    if (isAuth) {
      dispatch(toggleFavorite({ id: offer.id, status: offer.isFavorite }));
      return;
    }
    navigate(Addresses.Login);
  };
  ratingStyle.width = handleStars(offer.rating);

  return (
    <article className={`${type}__card place-card`}
      onMouseEnter={onActiveOfferChangeHandler && (() => onActiveOfferChangeHandler(offer))}
      onMouseLeave={onActiveOfferChangeHandler && (() => onActiveOfferChangeHandler(undefined))}
    >
      {offer.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className={`${type}__image-wrapper place-card__image-wrapper`}>
        <Link to={`/offer/${offer.id}`} onClick={handleScroll}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={260}
            height={200}
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{offer.price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <BookmarkButton type="place" isBookmarked={offer.isFavorite} handleBookmark={handleBookmark}/>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={ratingStyle} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`} onClick={handleScroll}>{offer.title.toCapitalized()}</Link>
        </h2>
        <p className="place-card__type">{offer.type.toCapitalized()}</p>
      </div>
    </article>
  );
};

const memoizedCard = memo(Card);

export default memoizedCard;
