import { OfferData, ReviewData, SelectedOfferData } from './types';
import faker from 'faker';

export const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;
export const getRandomFloat = (min: number, max: number) =>
  Math.random() * (max - min) + min;


export const createMockOffer: () => SelectedOfferData = () => ({
  id: faker.datatype.uuid(),
  title: faker.lorem.paragraph(),
  type: faker.lorem.word(),
  price: getRandomInt(100, 10000),
  city: {
    name: faker.address.cityName(),
    location: {
      latitude: getRandomFloat(45, 47),
      longitude: getRandomFloat(45, 47),
      zoom: getRandomInt(4, 8),
    },
  },
  location: {
    latitude: getRandomFloat(45, 47),
    longitude: getRandomFloat(45, 47),
    zoom: getRandomInt(4, 8),
  },
  isFavorite: faker.datatype.boolean(),
  isPremium: faker.datatype.boolean(),
  rating: getRandomFloat(1, 5),
  description: faker.lorem.sentence(),
  bedrooms: getRandomInt(1, 3),
  goods: faker.lorem.words(5).split(' '),
  host: {
    name: faker.name.findName(),
    avatarUrl: faker.internet.avatar(),
    isPro: faker.datatype.boolean(),
  },
  images: faker.datatype.array(getRandomInt(1,12)).map(() => faker.image.city()),
  maxAdults: getRandomInt(1, 4),
});


export const createMockOfferCard: () => OfferData = () => ({
  id: faker.datatype.uuid(),
  title: faker.lorem.paragraph(),
  type: faker.lorem.word(),
  price: getRandomInt(100, 10000),
  city: {
    name: faker.address.cityName(),
    location: {
      latitude: getRandomFloat(45, 47),
      longitude: getRandomFloat(45, 47),
      zoom: getRandomInt(4, 8),
    },
  },
  location: {
    latitude: getRandomFloat(45, 47),
    longitude: getRandomFloat(45, 47),
    zoom: getRandomInt(4, 8),
  },
  isFavorite: faker.datatype.boolean(),
  isPremium: faker.datatype.boolean(),
  rating: getRandomFloat(1, 5),
  previewImage: faker.image.city(),
});

export const createMockOfferCards = (count: number): OfferData[] => Array(count).fill(null).map(() => createMockOfferCard());

export const createMockReview: () => ReviewData = () => ({
  id: faker.datatype.uuid(),
  date: faker.date.recent().toISOString(),
  user: {
    name: faker.name.findName(),
    avatarUrl: faker.internet.avatar(),
    isPro: faker.datatype.boolean(),
  },
  comment: faker.lorem.sentence(),
  rating: getRandomFloat(1, 5),
});

export const createMockReviews = (count: number): ReviewData[] => Array(count).fill(null).map(() => createMockReview());

export const mockResponse = {
  offer: createMockOffer(),
  reviews: createMockReviews(getRandomInt(1, 14)),
  nearby: createMockOfferCards(5),
};
