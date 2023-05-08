import { generatePoint } from '../mock/generate-point-mock.js';
import {getRandomWayPoint} from '../mock/way-points.js';

const POINTS_COUNT = 5;

// export default class PointsModel {
//   points = Array.from({length: POINTS_COUNT}, generatePoint);

//   getPoints() {
//     return this.points;
//   }
// }

export default class PointsModel {
  constructor (service) {
    this.service = service;
    this.offers = this.service.generateOffers();
    this.destinations = this.service.generateDestinations();
    this.points = this.service.generatePoints();
  }

  getOffers() {
    return this.offers;
  }

  getByType(type) {
    return this.offers.find((offer) => offer.type === type).offers;
  }

  getDestinations() {
    return this.destinations;
  }

  getById(id) {
    return this.destinations.find((destination) => destination.id === id);
  }

  getPoints() {
    return this.points;
  }
}
