import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { OfferData, ReviewData, SelectedOfferData, State } from '../../types';

const activeOfferSliceState: State['activeOffer'] = {
  reviews: [],
  activeOffer: {
    id: '',
    title: '',
    type: '',
    price: 0,
    city: {
      name: '',
      location: {
        latitude: 0,
        longitude: 0,
        zoom: 0
      }
    },
    location: {
      latitude: 0,
      longitude: 0,
      zoom: 0
    },
    isFavorite: false,
    isPremium: false,
    rating: 0,
    description: '',
    bedrooms: 0,
    goods: [],
    host: {
      name: '',
      avatarUrl: '',
      isPro: false
    },
    images: [],
    maxAdults: 0
  },
  nearbyOffers: null,
};

export const activeOfferSlice = createSlice({
  name: 'activeOffer',
  initialState: activeOfferSliceState,
  reducers: {
    setActiveOffer: (state, action: PayloadAction<SelectedOfferData>) => {
      state.activeOffer = action.payload;
    },
    setNearbyOffers: (state, action: PayloadAction<OfferData[] | null>) => {
      state.nearbyOffers = action.payload;
    },
    setReviews: (state, action: PayloadAction<ReviewData[]>) => {
      state.reviews = action.payload;
    },
  }
});

export const { setActiveOffer, setNearbyOffers, setReviews } = activeOfferSlice.actions;
export const activeOfferReducer = activeOfferSlice.reducer;
