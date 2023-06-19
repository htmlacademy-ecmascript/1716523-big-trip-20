import TripInfoView from './view/trip-info-view';
import { RenderPosition, render, remove, replace } from './framework/render';

export default class TripInfoPresenter {

  #pointsModel = null;

  #container = null;
  #points = null;
  #destinations = null;
  #offers = null;

  #duration = 0;
  #sum = 0;

  #tripInfoComponent = null;
  // #modelEventHandler = null;

  constructor(container, pointsModel) {

    this.#pointsModel = pointsModel;
    this.#container = container;
    this.#points = pointsModel.getPoints();
    this.#offers = pointsModel.getOffers();
    this.#destinations = pointsModel.getDestinations();
  }

  init() {
    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  #render = () => {
    const prevtripInfoComponent = this.#tripInfoComponent;
    this.#tripInfoComponent = new TripInfoView(this.#points, this.#offers, this.#destinations);

    if (prevtripInfoComponent === null) {
      render(this.#tripInfoComponent, this.#container, RenderPosition.AFTERBEGIN);
    }

    // replace(this.#tripInfoComponent, prevtripInfoComponent);
    remove(prevtripInfoComponent);
  };

  #handleModelEvent = () => {
    this.#render();
  };
}
