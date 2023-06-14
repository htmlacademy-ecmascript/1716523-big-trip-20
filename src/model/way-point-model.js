import Observable from '../framework/observable.js';
export default class PointsModel extends Observable{
  constructor (offers, destinations, points) {
    super();
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

  updatePoint(updateType, update) {
    const index = this.points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this.points = [
      ...this.points.slice(0, index),
      update,
      ...this.points.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.points = [
      update,
      ...this.points,
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this.points = [
      ...this.points.slice(0, index),
      ...this.points.slice(index + 1),
    ];

    this._notify(updateType);
  }
}
