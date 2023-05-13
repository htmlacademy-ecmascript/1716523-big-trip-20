
export default class PointsModel {
  constructor (offers, destinations, points) {
    this.offers = offers;
    this.destinations = destinations;
    this.points = points;
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
