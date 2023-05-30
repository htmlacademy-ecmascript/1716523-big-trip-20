import { render, replace, remove} from './framework/render';
import TripEventsEditItemView from './view/trip-events-edit-item-view.js';
import TripEventsItemView from './view/trip-events-item-view.js';
import PhotoeTemplate from './view/photo-view';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};


export default class EventPointPresenter {
  itemComponent = null;
  editItemComponent = null;
  handleDataChange = null;
  #handleModeChange = null;
  #mode = Mode.DEFAULT;

  constructor(pointListContainer, offers, point, destination, photoesContainer, onDataChange, onModeChange) {
    this.pointListContainer = pointListContainer;
    this.point = point;
    this.offers = offers;
    this.destination = destination;
    this.photoesContainer = photoesContainer;
    this.handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToCard();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #showFormElement = () => {
    this.#replaceCardToForm();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #submitFormElement = () => {
    this.#replaceFormToCard();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #hideFormElement = () => {
    this.#replaceFormToCard();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #resetForm = () => {
    document.querySelector('form').reset();
  };

  #replaceCardToForm() {
    replace(this.editItemComponent, this.itemComponent);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToCard() {
    replace(this.itemComponent, this.editItemComponent);
    this.#mode = Mode.DEFAULT;
  }

  #favoriteToggle = () => {
    this.point = {...this.point, isFavorite:!this.point.isFavorite};
    this.handleDataChange(this.point);
  };

  init(point) {

    const prevItemComponent = this.itemComponent;
    const prevEditItemComponent = this.editItemComponent;

    this.currentOffer = this.offers.find((offer) => offer.type === this.point.type);
    this.itemComponent = new TripEventsItemView(point, {...this.currentOffer}, this.destination, this.#showFormElement, this.#favoriteToggle);
    // this.editItemComponent = new TripEventsEditItemView(point, {...this.currentOffer}, {...this.destination},
    //   this.#submitFormElement, this.#hideFormElement, this.#resetForm);
    this.editItemComponent = new TripEventsEditItemView({
      point,
      offer: this.currentOffer,
      destination: this.destination
    },
    this.#submitFormElement, this.#hideFormElement, this.#resetForm);

    if (prevItemComponent === null || prevEditItemComponent === null) {
      render(this.itemComponent, this.pointListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.itemComponent, prevItemComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.editItemComponent, prevEditItemComponent);
    }

    remove(prevItemComponent);
    remove(prevEditItemComponent);

    render (new PhotoeTemplate(this.destination), this.photoesContainer.element);
  }

  destroy() {
    remove(this.itemComponent);
    remove(this.editItemComponent);
  }

  resetView() {
    if (this.#mode === Mode.EDITING) {
      this.#replaceFormToCard();
    }
  }
}
