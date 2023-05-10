
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

  // getByType(type) {
  //   return this.offers.find((offer) => offer.type === type).offers;
  // } Я не пойму как оно работатет %)

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
