import { getRandomInteger, getRandomNumber } from '../utils';
// import { uniqueId } from './destination-mock';

function generatePoint (pointType, destinationId, offersIds) {
  return {
    id: getRandomInteger(1, 10),
    basePrice: getRandomNumber(),
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: destinationId,
    isFavorite: !!getRandomInteger(0, 1),
    offers: offersIds,
    type: pointType,
  };
}

export {generatePoint};
