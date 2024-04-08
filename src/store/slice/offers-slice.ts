import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CityData, OfferData, State } from '../../types';

const offersSliceState: State['offers'] = {
  city: {
    name: 'Paris',
    location: {
      latitude: 0,
      longitude: 0,
      zoom: 0
    }
  },
  offers: null,
};

export const offersSlice = createSlice({
  name: 'offers',
  initialState: offersSliceState,
  reducers: {
    setCity: (state, action: PayloadAction<CityData>) => {
      state.city = action.payload;
    },
    setOffers: (state, action: PayloadAction<OfferData[]>) => {
      state.offers = action.payload;
    },
    updateOffer: (state, action: PayloadAction<{ id: string; offer: OfferData }>) => {
      if (!state.offers) {
        return;
      }
      const offerToUpdate = state.offers.findIndex((offer) => offer.id === action.payload.id);
      state.offers[offerToUpdate] = action.payload.offer;
    }
  }
});

export const { setCity, setOffers, updateOffer } = offersSlice.actions;
export const offersReducer = offersSlice.reducer;
