import { createAsyncThunk } from '@reduxjs/toolkit';
import { OfferData, ReviewData, SelectedOfferData, State, loginResData } from '../types';
import { api } from '.';
import { AxiosError } from 'axios';
import { setError, setAuthStatus, setUserData, setFavorites } from './slice/api-slice';
import { setReviews, setActiveOffer, setNearbyOffers } from './slice/active-offer-slice';
import { setOffers, setCity, updateOffer } from './slice/offers-slice';

const extractError = (err: AxiosError) => {
  if (typeof err?.message === 'string') {
    return err?.message;
  }
  return `Unknown error: ${JSON.stringify(err, null, 2)}`;
};

export const loadOffers = createAsyncThunk(
  'SET_OFFERS',
  async (_, thunk) => {
    const savedToken = window.localStorage.getItem('six-cities-token');
    try {
      const state: State = thunk.getState() as State;
      const user: State['api']['userData'] = state.api.userData;
      const response = await api.get('/offers', {headers: {'X-Token': user ? user.token : savedToken}});
      const offers: OfferData[] = response.data as OfferData[];

      thunk.dispatch(setOffers(offers));
      thunk.dispatch(setCity(offers[0].city));
      thunk.dispatch(setError(null));
      return true;

    } catch (err: unknown) {
      const errResponse: AxiosError = err as AxiosError;
      const errorMessage = extractError(errResponse);

      thunk.dispatch(setError(`SET_OFFERS: ${errorMessage}`));
      return false;
    }
  }
);

export const loadReviews = createAsyncThunk(
  'SET_REVIEWS',
  async (id: string, thunk) => {
    try {
      const response = await api.get(`/comments/${id}`);
      const reviews: ReviewData[] = response.data as ReviewData[];

      thunk.dispatch(setReviews(reviews));
      thunk.dispatch(setError(null));
      return true;

    } catch (err: unknown) {
      const errResponse: AxiosError = err as AxiosError;
      const errorMessage = extractError(errResponse);

      thunk.dispatch(setError(`SET_REVIEWS: ${errorMessage}`));
      return false;
    }
  }
);

export const loadActiveOffer = createAsyncThunk(
  'SET_ACTIVE_OFFER',
  async (id: string, thunk) => {
    const savedToken = window.localStorage.getItem('six-cities-token');
    const state: State = thunk.getState() as State;
    try {
      const user: State['api']['userData'] = state.api.userData;
      const response = await api.get(`/offers/${id}`, {headers: {'X-Token': user ? user.token : savedToken}});
      const offer: SelectedOfferData = response.data as SelectedOfferData;

      thunk.dispatch(setActiveOffer(offer));
      thunk.dispatch(setError(null));
      return true;

    } catch (err: unknown) {
      const errResponse: AxiosError = err as AxiosError;
      const errorMessage = extractError(errResponse);
      thunk.dispatch(setError(`SET_ACTIVE_OFFER: ${errorMessage}`));
      state.api.isFailed.activeOffer = true;
      return false;
    }
  }
);

export const loadNearbyOffers = createAsyncThunk(
  'SET_NEARBY_OFFERS',
  async (id: string, thunk) => {
    const state: State = thunk.getState() as State;
    const savedToken = window.localStorage.getItem('six-cities-token');
    try {
      const user: State['api']['userData'] = state.api.userData;
      const response = await api.get(`/offers/${id}/nearby`, {headers: {'X-Token': user ? user.token : savedToken}});
      const offers: OfferData[] = response.data as OfferData[];
      thunk.dispatch(setNearbyOffers(offers));
      return true;
    } catch (err: unknown) {
      const errResponse: AxiosError = err as AxiosError;
      const errorMessage = extractError(errResponse);
      thunk.dispatch(setError(`SET_NEARBY_OFFERS: ${errorMessage}`));
      state.api.isFailed.nearbyOffers = true;
      return false;
    }
  }
);


export const tryAuth = createAsyncThunk(
  'TRY_AUTH',
  async (data: { email: string; password: string }, thunk) => {
    const state: State = thunk.getState() as State;
    try {
      const response = await api.post('/login', data);
      thunk.dispatch(setAuthStatus('AUTH'));
      const resData = response.data as loginResData;
      thunk.dispatch(setUserData(resData as State['api']['userData']));
      window.localStorage.setItem('six-cities-token', resData.token);
      thunk.dispatch(setError(null));
      thunk.dispatch(loadOffers());
      return true;

    } catch (err: unknown) {
      const errResponse: AxiosError = err as AxiosError;
      const errorMessage = extractError(errResponse);
      thunk.dispatch(setError(`TRY_AUTH: ${errorMessage}`));
      state.api.isFailed.login = true;
      return false;
    }
  }
);

export const loadAuthStatus = createAsyncThunk(
  'SET_AUTH_STATUS',
  async (_, thunk) => {
    const savedToken = window.localStorage.getItem('six-cities-token');
    try {
      const response = await api.get('/login', { headers: { 'X-Token': savedToken } });
      const data = response.data as loginResData;
      if (response.status === 200) {
        thunk.dispatch(setAuthStatus('AUTH'));
        window.localStorage.setItem('six-cities-token', data.token);
        thunk.dispatch(setUserData(data));

        return true;
      }

      thunk.dispatch(setAuthStatus('UNKNOWN'));
      thunk.dispatch(setUserData(null));
      return true;

    } catch (err) {
      thunk.dispatch(setAuthStatus('NO_AUTH'));
      thunk.dispatch(setUserData(null));
      return false;
    }
  }
);

export const logout = createAsyncThunk(
  'LOGOUT',
  async (_, thunk) => {
    const state: State = thunk.getState() as State;
    const offers = state.offers.offers;
    try {
      await api.delete('/logout', { headers: { 'X-Token': state.api.userData?.token } });
      window.localStorage.removeItem('six-cities-token');
      thunk.dispatch(setAuthStatus('NO_AUTH'));
      thunk.dispatch(setUserData(null));
      thunk.dispatch(setFavorites([]));
      offers?.map((offer) => thunk.dispatch(updateOffer({ id: offer.id, offer: { ...offer, isFavorite: false } })));
    } catch (err) {
      thunk.dispatch(setAuthStatus('NO_AUTH'));
      thunk.dispatch(setUserData(null));
    }
  }
);

export const postComment = createAsyncThunk(
  'POST_COMMENT',
  async (data: { comment: string; rating: number; id: string }, thunk) => {
    const state: State = thunk.getState() as State;
    try {
      const user: State['api']['userData'] = state.api.userData;
      const response = await api.post(`/comments/${data.id}`, { comment: data.comment, rating: data.rating }, { headers: { 'X-Token': user?.token } });
      thunk.dispatch(setError(null));
      thunk.dispatch(setReviews([...state.activeOffer.reviews, response.data as ReviewData]));
      return true;
    } catch (err: unknown) {
      const errResponse: AxiosError = err as AxiosError;
      const errorMessage = extractError(errResponse);
      thunk.dispatch(setError(errorMessage));
      state.api.isFailed.review = true;
      return false;
    }
  }
);

export const loadFavorites = createAsyncThunk(
  'SET_FAVORITES',
  async (_, thunk) => {
    const state: State = thunk.getState() as State;
    try {
      const user: State['api']['userData'] = state.api.userData;
      const response = await api.get('/favorite', { headers: { 'X-Token': user?.token } });
      const offers: OfferData[] = response.data as OfferData[];
      thunk.dispatch(setFavorites(offers));
      return true;
    } catch (err: unknown) {
      const errResponse: AxiosError = err as AxiosError;
      const errorMessage = extractError(errResponse);
      thunk.dispatch(setError(`SET_FAVORITES: ${errorMessage}`));
      state.api.isFailed.favorites = true;
      return false;
    }
  }
);


export const toggleFavorite = createAsyncThunk(
  'TOGGLE_FAVORITE',
  async (data: { id: string; status: boolean}, thunk) => {
    const state: State = thunk.getState() as State;
    const currentOffer = state.offers.offers?.find((offer) => offer.id === data.id);
    if (!currentOffer) {
      return;
    }
    const user: State['api']['userData'] = state.api.userData;
    try {
      const newStatus = Number(!data.status);
      thunk.dispatch(updateOffer({ id: data.id, offer: {...currentOffer, isFavorite: !currentOffer?.isFavorite} }));
      const response = await api.post(`/favorite/${data.id}/${newStatus}`, {},{ headers: { 'X-Token': user?.token } });
      thunk.dispatch(setError(null));
      if (newStatus === 0) {
        thunk.dispatch(setFavorites([...state.api.favoriteOffers].toSpliced(state.api.favoriteOffers.findIndex((offer) => offer.id === data.id), 1)));
      } else {
        thunk.dispatch(setFavorites([...state.api.favoriteOffers, response.data as OfferData]));
      }
      thunk.dispatch(loadActiveOffer(data.id));
      thunk.dispatch(loadNearbyOffers(data.id));
      return true;
    } catch (err: unknown) {
      thunk.dispatch(updateOffer({ id: data.id, offer: {...currentOffer, isFavorite: !currentOffer?.isFavorite} }));
      const errResponse: AxiosError = err as AxiosError;
      const errorMessage = extractError(errResponse);
      thunk.dispatch(setError(errorMessage));
      return false;
    }
  }
);
