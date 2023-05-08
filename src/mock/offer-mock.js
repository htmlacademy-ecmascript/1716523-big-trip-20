import { getRandomNumber } from '../utils';
import { uniqueId } from './destination-mock';

function generateOffer (type) {
  return {
    id: uniqueId,
    title: `offer ${type}`,
    price: getRandomNumber(),
  };
}

export { generateOffer };
