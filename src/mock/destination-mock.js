import { CITTES, DESCRIPTIONS } from '../const';
import { getRandomArrayElement, getRandomInteger, createUniqId } from '../utils';

function createPicturesArr (id, cityName, cityDescription) {
  return {
    'src': `https://loremflickr.com/248/152/${id}`,
    'description': `${cityName} ${cityDescription}`,
  };
}

function generateDestinationObj() {
  const uniqueId = createUniqId(1, 10);
  const city = getRandomArrayElement(CITTES);
  const description = getRandomArrayElement(DESCRIPTIONS);

  return {
    id: uniqueId(),
    name: city,
    description: description,
    pictures: Array.from({length: getRandomInteger(1, 4)}, () => createPicturesArr(uniqueId(), city, description))
  };
}


export {generateDestinationObj};
