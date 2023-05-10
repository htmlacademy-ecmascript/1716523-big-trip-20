import { getRandomNumber, getRandomInteger } from '../utils';
// import { uniqueId } from './destination-mock';

function generateOffer (type) {
  return {
    id: getRandomInteger(1, 10),
    title: `offer ${type}`,
    price: getRandomNumber(),
  };
}

// function generateOffer (type) {
//   {
//     type:
//   }
//   return {
//     id: getRandomInteger(1, 10),
//     title: `offer ${type}`,
//     price: getRandomNumber(),
//   };
// }

export { generateOffer };
