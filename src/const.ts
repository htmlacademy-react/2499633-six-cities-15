export const CITIES = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf'
] as const;

export const SORT_BY_VALUES: string[] = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first',
];

export enum Addresses {
    Main = '/',
    Login = '/login',
    Favorites = '/favorites',
    Offer = '/offer/:id',
}

export const AUTH_STATUS_VALUES = [
  'AUTH',
  'NO_AUTH',
  'UNKNOWN'
] as const ;

export const handleStars = (width: number) => `${String(Math.round(width) * 20)}%`;

export const URL_MARKER_DEFAULT: string = 'img/pin.svg';
export const URL_MARKER_CURRENT: string = 'img/pin-active.svg';


