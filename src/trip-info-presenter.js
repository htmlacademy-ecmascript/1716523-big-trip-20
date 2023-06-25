import TripInfoView from './view/trip-info-view';
import { RenderPosition, render, remove, replace } from './framework/render';

export default class TripInfoPresenter {

  #pointsModel = null;

  #container = null;
  #points = null;
  #destinations = null;
  #offers = null;

  #tripInfoComponent = null;

  constructor(container, pointsModel) {

    this.#pointsModel = pointsModel;
    this.#container = container;
    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  init(points, offers, destinations) {
    this.#points = points;
    this.#offers = offers;
    this.#destinations = destinations;
  }

  renderHeader() {
    this.#render();
  }

  destroy() {
    remove(this.#tripInfoComponent);
  }

  #render = (points, offers, destinations) => {

    const prevTripInfoComponent = this.#tripInfoComponent;
    this.#tripInfoComponent = new TripInfoView(points, offers, destinations);

    if (prevTripInfoComponent === null) {
      render(this.#tripInfoComponent, this.#container, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#tripInfoComponent, prevTripInfoComponent);
    remove(prevTripInfoComponent);
  };

  #handleModelEvent = () => {
    this.#render(this.#points, this.#offers, this.#destinations);
  };
}

