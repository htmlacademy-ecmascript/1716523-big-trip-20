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

  constructor(container, points, offers, destinations, pointsModel) {

    this.#pointsModel = pointsModel;
    this.#container = container;
    this.#points = points;
    this.#offers = offers;
    this.#destinations = destinations;
  }

  init() {
    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  renderHeader() {
    this.#render();
  }

  destroy() {
    remove(this.#tripInfoComponent);
  }

  #render = () => {

    const prevTripInfoComponent = this.#tripInfoComponent;
    console.log(prevTripInfoComponent, 'ddd')
    this.#tripInfoComponent = new TripInfoView(this.#points, this.#offers, this.#destinations);

    if (prevTripInfoComponent === null) {
      render(this.#tripInfoComponent, this.#container, RenderPosition.AFTERBEGIN);
      return;
    }

    // replace(this.#tripInfoComponent, prevTripInfoComponent);
    replace(prevTripInfoComponent, this.#tripInfoComponent);
    remove(this.#tripInfoComponent);
    // remove(prevTripInfoComponent);
  };

  #handleModelEvent = () => {
    this.#render();
  };
}

// export default class TripInfoPresenter {
//   #container = null;
//   #tripInfoComponent = null;
//   #points = null;
//   #destinations = null;
//   #offers = null;

//   constructor (container) {
//     this.#container = container;
//   }

//   init(points, destinations, offers) {

//     const previousInfoComponent = this.#tripInfoComponent;

//     this.#points = points;
//     this.#destinations = destinations;
//     this.#offers = offers;

//     this.#tripInfoComponent = new TripInfoView (this.#points, this.#destinations, this.#offers);

//     if (this.#points === 0) {
//       this.#tripInfoComponent.destroy();
//     }

//     if (previousInfoComponent === null) {
//       render(this.#tripInfoComponent, this.#container, RenderPosition.AFTERBEGIN);
//       return;
//     }

//     replace(this.#tripInfoComponent, previousInfoComponent);

//     remove(previousInfoComponent);
//   }

//   destroy() {
//     if (this.#tripInfoComponent === null) {
//       return;
//     }

//     remove(this.#tripInfoComponent);
//     this.#tripInfoComponent = null;
//   }
// }
