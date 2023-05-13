import { getRandomNumber, getRandomInteger } from '../utils';

function generateOffer (type) {
  return {
    id: getRandomInteger(1, 10),
    title: `offer ${type}`,
    price: getRandomNumber(),
  };
}

export { generateOffer };
