import { CITTES, DESCRIPTIONS } from '../const';
import { createUniqId, getRandomArrayElement } from '../utils';

const uniqueId = createUniqId(1,10)();

function generateDestinationObj() {
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
      }
    ]
  };
}


export {generateDestinationObj, uniqueId};
