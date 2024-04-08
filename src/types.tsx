import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { AUTH_STATUS_VALUES } from './const';
export type Point = {
  id: string;
  latitude: number;
  longitude: number;
};

export type Points = Point[];

export type CityData = {
  name: string;
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
}

export type OfferData = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: CityData;
  location: {
  latitude: number;
  longitude: number;
  zoom: number;
  };
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
};

export type SelectedOfferData = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: CityData;
  location: {
  latitude: number;
  longitude: number;
  zoom: number;
  };
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  bedrooms: number;
  goods: string[];
  host: {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  };
  images: string[];
  maxAdults: number;
};

export type AuthStatus = typeof AUTH_STATUS_VALUES[number];

export type State = {
  offers: {
    city: CityData;
    offers: OfferData[] | null;
  };
  activeOffer: {
    reviews: ReviewData[];
    activeOffer: SelectedOfferData;
    nearbyOffers: OfferData[] | null;
  };
  api: {
    authorizationStatus: AuthStatus;
    userData: {
      name: string;
      email: string;
      avatarUrl: string;
      isPro: boolean;
      token: string;
    } | null;
    favoriteOffers: OfferData[];
    error: string | null;
    isLoading: {
      offers: boolean;
      reviews: boolean;
      activeOffer: boolean;
      nearbyOffers: boolean;
      favorites: boolean;
    };
    isSending: {
      review: boolean;
      login: boolean;
    };
    isFailed: {
      offers: boolean;
      reviews: boolean;
      review: boolean;
      activeOffer: boolean;
      nearbyOffers: boolean;
      favorites: boolean;
      login: boolean;
    };
  };
};

export type ReviewData = {
id: string;
date: string;
user: {
name: string;
avatarUrl: string;
isPro: boolean;
};
comment: string;
rating: number;
}

export type Dispatch = ThunkDispatch<State, void, AnyAction>;

export type loginResData = {
name: string;
avatarUrl: string;
isPro: boolean;
email: string;
token: string;
}

