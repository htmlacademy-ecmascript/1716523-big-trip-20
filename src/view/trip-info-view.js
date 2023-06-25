
import AbstractView from '../framework/view/abstract-view';
import { getTripInfoDestinations, getTripInfoCost, getPointsTotalCost, getTripInfoDates } from '../utils';

function createTripInfoTemplate (points, offers, destinations) {
  return (
    `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${getTripInfoDestinations(points, destinations)}</h1>

    <p class="trip-info__dates">${getTripInfoDates(points)}</p>
  </div>

  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTripInfoCost(points) + getPointsTotalCost(points, offers)}</span>
  </p>
</section>`
  );
}


export default class TripInfoView extends AbstractView {
  #points = null;
  #offers = null;
  #destinations = null;

  constructor(sortedPoints, offers, destinations) {
    super();
    this.#points = sortedPoints;
    this.#offers = offers;
    this.#destinations = destinations;
  }

  get template () {
    return createTripInfoTemplate (this.#points, this.#offers, this.#destinations);
  }
}
