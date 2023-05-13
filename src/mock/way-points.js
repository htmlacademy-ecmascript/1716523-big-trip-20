import { getRandomArrayElement, getRandomNumber } from '../utils';
import { POINT_TYPES } from '../const';

const mockPoints = [
  {
    id: 1,
    basePrice: getRandomNumber(),
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 1,
    isFavorite: false,
    offers: [1, 2, 3],
    type: getRandomArrayElement(POINT_TYPES),
  },
  {
    id: 2,
    basePrice: getRandomNumber(),
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 2,
    isFavorite: false,
    offers: [1, 2,],
    type: getRandomArrayElement(POINT_TYPES),
  },
  {
    id: 3,
    basePrice: getRandomNumber(),
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 3,
    isFavorite: false,
    offers: [3],
    type: getRandomArrayElement(POINT_TYPES),
  },
  {
    id: 4,
    basePrice: getRandomNumber(),
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 4,
    isFavorite: false,
    offers: [1, 2, 3, 4],
    type: getRandomArrayElement(POINT_TYPES),
  },
  {
    id: 5,
    basePrice: getRandomNumber(),
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 5,
    isFavorite: false,
    offers: [1, 2],
    type: getRandomArrayElement(POINT_TYPES),
  },
  {
    id: 6,
    basePrice: getRandomNumber(),
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 6,
    isFavorite: false,
    offers: [2],
    type: getRandomArrayElement(POINT_TYPES),
  },
  {
    id: 7,
    basePrice: getRandomNumber(),
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 7,
    isFavorite: false,
    offers: [3, 4],
    type: getRandomArrayElement(POINT_TYPES),
  },
  {
    id: 8,
    basePrice: getRandomNumber(),
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 8,
    isFavorite: false,
    offers: [1, 3, 4],
    type: getRandomArrayElement(POINT_TYPES),
  },
  {
    id: 9,
    basePrice: getRandomNumber(),
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 9,
    isFavorite: false,
    offers: [4],
    type: getRandomArrayElement(POINT_TYPES),
  },

];

const mockOffers = [
  {
    type: 'taxi',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 70,
      },
      {
        id: 2,
        title: 'Choose the radio station',
        price: 140,
      },
      {
        id: 3,
        title: 'Choose temperature',
        price: 63,
      },
      {
        id: 4,
        title: 'Drive quickly',
        price: 84,
      },
    ],
  },
  {
    type: 'bus',
    offers: [
      {
        id: 1,
        title: 'Infotainment system',
        price: 61,
      },
      {
        id: 2,
        title: 'Order meal',
        price: 63,
      },
      {
        id: 3,
        title: 'Choose seats',
        price: 161,
      }
    ],
  },
  {
    type: 'train',
    offers: [
      {
        id: 1,
        title: 'Book a taxi at the arrival point',
        price: 55,
      },
      {
        id: 2,
        title: 'Order a breakfast',
        price: 137,
      },
      {
        id: 3,
        title: 'Wake up at a certain time',
        price: 71,
      }
    ],
  },
  {
    type: 'flight',
    offers: [
      {
        id: 1,
        title: 'Choose meal',
        price: 138,
      },
      {
        id: 2,
        title: 'Choose seats',
        price: 68,
      },
      {
        id: 3,
        title: 'Upgrade to comfort class',
        price: 48,
      },
      {
        id: 4,
        title: 'Add luggage',
        price: 188,
      },
    ],
  },
  {
    type: 'check-in',
    offers: [
      {
        id: 1,
        title: 'Choose the time of check-in',
        price: 122,
      },
      {
        id: 2,
        title: 'Choose the time of check-out',
        price: 170,
      },
      {
        id: 3,
        title: 'Add breakfast',
        price: 114,
      },
      {
        id: 4,
        title: 'Laundry',
        price: 168,
      },
      {
        id: 5,
        title: 'Order a meal from the restaurant',
        price: 45,
      }
    ],
  },
  {
    type: 'sightseeing',
    offers: [],
  },
  {
    type: 'ship',
    offers: [
      {
        id: 1,
        title: 'Choose meal',
        price: 91,
      },
      {
        id: 2,
        title: 'Choose seats',
        price: 71,
      },
      {
        id: 3,
        title: 'Upgrade to comfort class',
        price: 113,
      },
      {
        id: 4,
        title: 'Upgrade to business class',
        price: 30,
      },
      {
        id: 5,
        title: 'Add luggage',
        price: 172,
      },
      {
        id: 6,
        title: 'Business lounge',
        price: 177,
      }
    ],
  },
  {
    type: 'drive',
    offers: [
      {
        id: 1,
        title: 'With automatic transmission',
        price: 30,
      },
      {
        id: 2,
        title: 'With air conditioning',
        price: 103,
      }
    ],
  },
  {
    type: 'restaurant',
    offers: [
      {
        id: 1,
        title: 'Choose live music',
        price: 50,
      },
      {
        id: 2,
        title: 'Choose VIP area',
        price: 61,
      }
    ],
  }
];

// const mockDestinations = [
//   {
//     id: 1,
//     description: getRandomArrayElement(DESCRIPTIONS),
//     name: 'Amsterdam',
//     pictures: [
//       {
//         src: `https://loremflickr.com/248/152?random=${Math.floor(Math.random() * 10)}`,
//         description: getRandomArrayElement(DESCRIPTIONS),
//       }
//     ],
//   },
//   {
//     id: 2,
//     description: getRandomArrayElement(DESCRIPTIONS),
//     name: 'Geneva',
//     pictures: [
//       {
//         src: `https://loremflickr.com/248/152?random=${Math.floor(Math.random() * 10)}`,
//         description: getRandomArrayElement(DESCRIPTIONS),
//       },
//       {
//         src: `https://loremflickr.com/248/152?random=${Math.floor(Math.random() * 10)}`,
//         description: getRandomArrayElement(DESCRIPTIONS),
//       },
//     ],
//   },
//   {
//     id: 3,
//     description: getRandomArrayElement(DESCRIPTIONS),
//     name: 'Chamonix',
//     pictures: [
//       {
//         src: `https://loremflickr.com/248/152?random=${Math.floor(Math.random() * 10)}`,
//         description: getRandomArrayElement(DESCRIPTIONS),
//       },
//       {
//         src: `https://loremflickr.com/248/152?random=${Math.floor(Math.random() * 10)}`,
//         description: getRandomArrayElement(DESCRIPTIONS),
//       },
//       {
//         src: `https://loremflickr.com/248/152?random=${Math.floor(Math.random() * 10)}`,
//         description: getRandomArrayElement(DESCRIPTIONS),
//       },
//     ],
//   },
// ];

function getRandomWayPoint () {
  return getRandomArrayElement(mockPoints);
}

export {getRandomWayPoint, mockOffers};
