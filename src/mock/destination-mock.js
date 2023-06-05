// import { CITIES, DESCRIPTIONS } from '../const';
// import { getRandomArrayElement, getRandomInteger } from '../utils';

// let index = 0;

function createPicturesArr (id, cityName, cityDescription) {
  return {
    'src': `https://loremflickr.com/248/152/${id}`,
    'description': `${cityName} ${cityDescription}`,
  };
}

// function generateDestinationObj() {
//   let uniqueId = 0;
//   const city = CITIES[0];

//   // for (let i = 0; i < CITTES.length; i++) {
//   //   uniqueId = i;
//   //   city = CITTES[i];
//   // }

//   const description = getRandomArrayElement(DESCRIPTIONS);

//   return {
//     id: uniqueId,
//     name: city,
//     description: description,
//     pictures: Array.from({length: getRandomInteger(1, 4)}, () => createPicturesArr(uniqueId, city, description))
//   };
// }

function generateDestinationObj(id, name, description, pictures) {
  return {
    id,
    name,
    description,
    pictures,
  };
}


export {generateDestinationObj, createPicturesArr};
