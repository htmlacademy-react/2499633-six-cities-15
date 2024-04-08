import { AuthStatus, SelectedOfferData, CityData, OfferData, ReviewData, State } from './../types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const initialState : State = {
  city: {
    name: 'Paris',
    location: {
      latitude: 0,
      longitude: 0,
      zoom: 0
    }
  },
  offers: null,
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
  authorizationStatus: 'UNKNOWN',
  userData: null,
  favoriteOffers: [],
  error: null,
  isLoading: {
    offers: false,
    reviews: false,
    activeOffer: false,
    nearbyOffers: false,
    favorites: false
  },
  isSending: {
    review: false,
    login: false,
  },
  isFailed: {
    offers: false,
    reviews: false,
    review: false,
    activeOffer: false,
    nearbyOffers: false,
    favorites: false,
    login: false
  },
};

export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<CityData>) => {
      state.city = action.payload;
    },
    setOffers: (state, action: PayloadAction<OfferData[]>) => {
      state.offers = action.payload;
    },
    updateOffer: (state, action: PayloadAction<{ id: string; offer: OfferData }>) => {
      if (state.offers === null) {
        return;
      }
      const offerToUpdate = state.offers.findIndex((offer) => offer.id === action.payload.id);
      state.offers[offerToUpdate] = action.payload.offer;
    }
  }
});

export const { setCity, setOffers, updateOffer } = offersSlice.actions;
export const offersReducer = offersSlice.reducer;

export const activeOfferSlice = createSlice({
  name: 'activeOffer',
  initialState,
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

export const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setAuthStatus: (state, action: PayloadAction<AuthStatus>) => {
      state.authorizationStatus = action.payload;
    },
    setUserData: (state, action: PayloadAction<State['userData'] | null>) => {
      state.userData = action.payload;
    },
    setFavorites: (state, action: PayloadAction<OfferData[]>) => {
      state.favoriteOffers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase('setOffers/pending', (state) => {
        state.isLoading.offers = true;
        state.isFailed.offers = false;
      })
      .addCase('setReviews/pending', (state) => {
        state.isLoading.reviews = true;
        state.isFailed.reviews = false;
      })
      .addCase('SET_ACTIVE_OFFER/pending', (state) => {
        state.isLoading.activeOffer = true;
        state.isFailed.activeOffer = false;
      })
      .addCase('setNearbyOffers/pending', (state) => {
        state.isLoading.nearbyOffers = true;
        state.isFailed.nearbyOffers = false;
      })
      .addCase('LOAD_FAVORITES/pending', (state) => {
        state.isLoading.favorites = true;
        state.isFailed.favorites = false;
      })
      .addCase('setOffers/rejected', (state) => {
        state.isLoading.offers = false;
        state.isFailed.offers = true;
      })
      .addCase('setReviews/rejected', (state) => {
        state.isLoading.reviews = false;
        state.isFailed.reviews = true;
      })
      .addCase('SET_ACTIVE_OFFER/rejected', (state) => {
        state.isLoading.activeOffer = false;
        state.isFailed.activeOffer = true;
      })
      .addCase('setNearbyOffers/rejected', (state) => {
        state.isLoading.nearbyOffers = false;
        state.isFailed.nearbyOffers = true;
      })
      .addCase('LOAD_FAVORITES/rejected', (state) => {
        state.isLoading.favorites = false;
        state.isFailed.favorites = true;
      })
      .addCase('setOffers/fulfilled', (state) => {
        state.isLoading.offers = false;
        state.isFailed.offers = false;
      })
      .addCase('setReviews/fulfilled', (state) => {
        state.isLoading.reviews = false;
        state.isFailed.reviews = false;
      })
      .addCase('SET_ACTIVE_OFFER/fulfilled', (state) => {
        state.isLoading.activeOffer = false;
        state.isFailed.activeOffer = false;
      })
      .addCase('setNearbyOffers/fulfilled', (state) => {
        state.isLoading.nearbyOffers = false;
        state.isFailed.nearbyOffers = false;
      })
      .addCase('LOAD_FAVORITES/fulfilled', (state) => {
        state.isLoading.favorites = false;
        state.isFailed.favorites = false;
      })
      .addCase('POST_COMMENT/pending', (state) => {
        state.isSending.review = true;
        state.isFailed.review = false;
      })
      .addCase('POST_COMMENT/rejected', (state) => {
        state.isSending.review = false;
        state.isFailed.review = true;
      })
      .addCase('POST_COMMENT/fulfilled', (state) => {
        state.isSending.review = false;
        state.isFailed.review = false;
      })
      .addCase('TRY_AUTH/pending', (state) => {
        state.isSending.login = true;
        state.isFailed.login = false;
      })
      .addCase('TRY_AUTH/rejected', (state) => {
        state.isSending.login = false;
        state.isFailed.login = true;
      })
      .addCase('TRY_AUTH/fulfilled', (state) => {
        state.isSending.login = false;
        state.isFailed.login = false;
      });
  },
});

export const { setError, setAuthStatus, setUserData, setFavorites } = apiSlice.actions;
export const apiReducer = apiSlice.reducer;
