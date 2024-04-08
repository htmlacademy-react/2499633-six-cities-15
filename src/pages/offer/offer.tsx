import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Layout } from '../../components/layout/layout.tsx';
import { Addresses, handleStars } from '../../const.ts';
import { RatingStars } from './rating-stars.tsx';
import { OfferFeatures } from './offer-features.tsx';
import { OfferInside } from './offer-inside.tsx';
import { Host } from './host.tsx';
import { OfferReviews } from './offer-reviews.tsx';
import NearbyOffers from './nearby-offers.tsx';
import BookmarkButton from '../../components/bookmark-button/bookmark-button.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { CityData, Dispatch, OfferData, State } from '../../types.tsx';
import { MouseEventHandler, useCallback, useEffect, useState } from 'react';
import { loadActiveOffer, loadNearbyOffers, loadReviews, toggleFavorite } from '../../store/action.ts';
import Map from '../../components/map/map.tsx';
import { getTargetOffer, getNearbyOffers, getAuthStatus, getSortedReviews } from '../../store/selector.ts';
import '../../string.extensions.ts';
import { Spinner } from '../main/spinner.tsx';


export const Offer = () => {
  const params = useParams();
  const dispatch: Dispatch = useDispatch();
  const targetReviews = useSelector(getSortedReviews);
  const targetOffer = useSelector(getTargetOffer);
  const selectedCity: CityData = targetOffer.city;
  const nearbyOffers = useSelector(getNearbyOffers);
  const [, setActiveOffer] = useState(nearbyOffers?.[0]);
  const offersIsLoading = useSelector((state: State) => state.api.isLoading.activeOffer);
  const reviewsIsLoading = useSelector((state: State) => state.api.isLoading.reviews);
  const nearbyOffersIsLoading = useSelector((state: State) => state.api.isLoading.nearbyOffers);
  const offerIsFailed = useSelector((state: State) => state.api.isFailed.activeOffer);
  const reviewsIsFailed = useSelector((state: State) => state.api.isFailed.reviews);
  const nearbyOffersIsFailed = useSelector((state: State) => state.api.isFailed.nearbyOffers);
  const onActiveOfferChangeHandler = useCallback((offer: OfferData | undefined) => {
    setActiveOffer(offer);
  }, []);
  const isAuth = useSelector(getAuthStatus) === 'AUTH';
  const navigate = useNavigate();
  const handleBookmark: MouseEventHandler = (evt) => {
    evt.preventDefault();
    if (isAuth) {
      dispatch(toggleFavorite({ id: targetOffer.id, status: targetOffer.isFavorite }));
      return;
    }
    navigate(Addresses.Login);
  };

  const trimmedNearbyOffers: OfferData[] = nearbyOffers ? [...nearbyOffers].splice(0, 3) : [];

  const activePoints = nearbyOffers && [targetOffer, ...trimmedNearbyOffers].map(({ id, location: { latitude, longitude } }) => ({
    id,
    latitude,
    longitude,
  }));

  const selectedPoint = {
    id: targetOffer.id,
    latitude: targetOffer.location.latitude,
    longitude: targetOffer.location.longitude,
  };

  useEffect(() => {
    if (params.id) {
      dispatch(loadActiveOffer(params.id));
      dispatch(loadReviews(params.id));
      dispatch(loadNearbyOffers(params.id));
    }
    if (offerIsFailed) {
      navigate('*');
    }
  }, [dispatch, params, offerIsFailed]);

  if (targetOffer === undefined) {
    return <Navigate to='*'/>;
  }

  const ratingStyle = { width: '80%' };
  ratingStyle.width = handleStars(targetOffer.rating);

  return (
    <Layout>
      <>
        {offersIsLoading || offerIsFailed && <Spinner />}
        {!offersIsLoading && !offerIsFailed &&
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">

              {[...targetOffer.images].splice(0,6).map((image, index) => {
                const key = index;
                return(
                  <div className="offer__image-wrapper" key={key}>
                    <img
                      className="offer__image"
                      src={image}
                      alt="Photo studio"

                    />
                  </div>);
              })}

            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {targetOffer.isPremium &&
                <div className="offer__mark">
                  <span>Premium</span>
                </div>}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {targetOffer.title.toCapitalized()}
                </h1>
                <BookmarkButton type={'offer'} isBookmarked={targetOffer.isFavorite} handleBookmark={handleBookmark} />
              </div>
              <RatingStars rating={targetOffer.rating} />
              <OfferFeatures features={targetOffer} />
              <div className="offer__price">
                <b className="offer__price-value">€{targetOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <OfferInside goods={targetOffer.goods} />
              <Host
                host={targetOffer.host}
                avatarUrl={targetOffer.host.avatarUrl}
                description={targetOffer.description}
              />
              {reviewsIsLoading || reviewsIsFailed && <Spinner/>}
              {!reviewsIsFailed && !reviewsIsLoading && <OfferReviews reviews={targetReviews} id={targetOffer.id} />}
            </div>
          </div>
          {nearbyOffers && <Map city={selectedCity} points={activePoints} selectedPoint={selectedPoint} className='offer__map map'/>}
        </section>}
        {nearbyOffersIsLoading || nearbyOffersIsFailed && <Spinner/>}
        {!nearbyOffersIsLoading && !nearbyOffersIsFailed && nearbyOffers && <NearbyOffers offers={nearbyOffers} onActiveOfferChangeHandler={onActiveOfferChangeHandler}/>}
      </>
    </Layout>

  );
};
