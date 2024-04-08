import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { apiReducer } from './slice/api-slice';
import { axiosInst } from '../api';
import { activeOfferReducer } from './slice/active-offer-slice';
import { offersReducer } from './slice/offers-slice';

export const api = axiosInst;

export const store = configureStore({
  reducer: combineReducers({offers: offersReducer, activeOffer: activeOfferReducer, api: apiReducer}),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
