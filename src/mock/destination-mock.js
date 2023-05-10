import { CITTES, DESCRIPTIONS } from '../const';
import { getRandomArrayElement, getRandomInteger } from '../utils';

function generateDestinationObj() {
  const uniqueId = getRandomInteger(1,10);
  const city = getRandomArrayElement(CITTES);
  const description = getRandomArrayElement(DESCRIPTIONS);

  return {
    id: uniqueId,
    name: city,
    description: description,
    pictures: [
      {
        'src': `https://loremflickr.com/248/152?${uniqueId}`,
        'description': `${city} ${description}`
      },
      {
        'src': `https://loremflickr.com/248/152?${uniqueId}`,
        'description': `${city} ${description}`
      }
    ]
  };
}


export {generateDestinationObj};
