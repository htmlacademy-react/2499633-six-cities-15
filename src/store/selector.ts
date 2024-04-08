import { createSelector } from '@reduxjs/toolkit';
import { State } from '../types';

export const getOffers = createSelector([(state: State) => state.offers.offers], (offers) => offers);
export const getTargetReviews = createSelector([(state: State) => state.activeOffer.reviews], (reviews) => reviews);
export const getSortedReviews = createSelector(getTargetReviews, (reviews) => {
  const getDate = (date: string) => new Date(date).getTime();
  return [...reviews].sort((a, b) => getDate(b.date) - getDate(a.date));
});
export const getTargetOffer = createSelector([(state: State) => state.activeOffer.activeOffer], (offer) => offer);
export const getNearbyOffers = createSelector([(state: State) => state.activeOffer.nearbyOffers], (offers) => offers);
export const getAuthStatus = createSelector([(state: State) => state.api.authorizationStatus], (status) => status);
export const getSelectedCity = createSelector([(state: State) => state.offers.city], (city) => city);
export const getFavorites = createSelector([(state: State) => state.api.favoriteOffers], (favoriteOffers) => favoriteOffers);
export const getOffersByCity = createSelector([(state: State) => state.offers.offers, (state: State) => state.offers.city], (offers, city) => {
  if (!offers) {
    return [];
  }
  return offers.filter((offer) => offer.city.name === city.name);
});
