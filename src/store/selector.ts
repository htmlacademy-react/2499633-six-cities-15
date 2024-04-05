import { createSelector } from '@reduxjs/toolkit';
import { State } from '../types';
import { CITIES } from '../const';

export const getOffers = createSelector([(state: State) => state.offers], (offers) => offers);
export const getTargetReviews = createSelector([(state: State) => state.reviews], (reviews) => reviews);
export const getSortedReviews = createSelector(getTargetReviews, (reviews) => {
  const getDate = (date: string) => new Date(date).getTime();
  return [...reviews].sort((a, b) => getDate(b.date) - getDate(a.date));
});
export const getTargetOffer = createSelector([(state: State) => state.activeOffer], (offer) => offer);
export const getNearbyOffers = createSelector([(state: State) => state.nearbyOffers], (offers) => offers);
export const getAuthStatus = createSelector([(state: State) => state.authorizationStatus], (status) => status);
export const getSelectedCity = createSelector([(state: State) => state.city], (city) => city);
export const getFavorites = createSelector([(state: State) => state.favoriteOffers], (favoriteOffers) => favoriteOffers);
export const getOffersByCity = createSelector([(state: State) => state.offers, (state: State) => state.city], (offers, city) => {
  if (!offers) {
    return [];
  }
  return offers.filter((offer) => offer.city.name === city.name);
});
// export const getRandomCity = () => (CITIES[Math.floor(Math.random() * CITIES.length)]);
