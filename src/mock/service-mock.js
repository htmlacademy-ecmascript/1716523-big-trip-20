import { generateDestinationObj } from './destination-mock';
import { generateOffer } from './offer-mock';
import { generatePoint } from './generate-point-mock';
import { POINT_TYPES } from '../const';
import { getRandomArrayElement, getRandomInteger } from '../utils';

const DESTINATION_COUNT = 10;
const OFFER_COUNT = 5;
const POINTS_COUNT = 5;

export default class MockService {
  #destinations = this.generateDestinations();
  #offers = this.generateOffers();
  #points = this.generatePoints();

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  get points() {
    return this.#points;
  }


  generateDestinations() {
    return Array.from({length: DESTINATION_COUNT}, () => generateDestinationObj());
  }

  generateOffers() {
    return POINT_TYPES.map((type) => ({
      type,
      offers: Array.from({length: getRandomInteger(0, OFFER_COUNT)}, () => generateOffer(type))
    }));
  }

  generatePoints() {
    return Array.from({length: POINTS_COUNT}, () => {
      const type = getRandomArrayElement(POINT_TYPES);
      const destination = getRandomArrayElement(this.destinations);

      const hasOffers = getRandomInteger(0, 1);

      const offersByType = this.offers.find((offerByType) => offerByType.type === type);

      const offerIds = (hasOffers) ? offersByType.offers
        .slice(0, getRandomInteger(0, OFFER_COUNT)).map((offer) => offer.id) : [];
      return generatePoint(type, destination.id, offerIds);
    });
  }
}
