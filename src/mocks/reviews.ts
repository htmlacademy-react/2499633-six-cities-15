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

export const REVIEWS: ReviewData[] = [
  {
    id: 'b67ddfd5-b953-4a30-8c8d-bd083cd6b62a',
    date: '2019-05-08T14:13:56.569Z',
    user: {
      name: 'Oliver Conner',
      avatarUrl: 'https://url-to-image/image.png',
      isPro: false
    },
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    rating: 4
  }
];