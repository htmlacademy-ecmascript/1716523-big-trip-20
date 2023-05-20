import { getRandomInteger, getRandomNumber } from '../utils';

function generatePoint (pointType, destinationId, offersIds) {
  return {
    id: getRandomInteger(1, 10),
    basePrice: getRandomNumber(),
    dateFrom: `2024-0${getRandomInteger(1, 9)}-10T22:55:56.845Z`,
    dateTo: `2024-0${getRandomInteger(1, 9)}-11T11:22:13.375Z`,
    destination: destinationId,
    isFavorite: !!getRandomInteger(0, 1),
    offers: offersIds,
    type: pointType,
  };
}

export {generatePoint};
