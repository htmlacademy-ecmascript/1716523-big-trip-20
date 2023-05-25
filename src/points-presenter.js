import { render, replace, remove} from './framework/render';
import TripEventsEditItemView from './view/trip-events-edit-item-view.js';
import TripEventsItemView from './view/trip-events-item-view.js';
import PhotoeTemplate from './view/photo-view';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};


export default class EventPointPresenter {
  // #pointListContainer = null;
  itemComponent = null;
  editItemComponent = null;
  // #point = null;
  // #offers = null;
  // #destination = null;
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

    // this.currentOffer = this.offers.find((offer) => offer.type === this.point.type);
    // this.itemComponent = new TripEventsItemView({point}, {...this.currentOffer}, this.destination, this.#showFormElement);
    // this.editItemComponent = new TripEventsEditItemView({point}, {...this.currentOffer}, {...this.destination},
    //   this.#submitFormElement, this.#hideFormElement, this.#resetForm);
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
    console.log(this.#handleModeChange, 'fff')
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToCard() {
    replace(this.itemComponent, this.editItemComponent);
    this.#mode = Mode.DEFAULT;
  }

  #favoriteToggle = (element) => {
    // console.log(this.point, 'sss');
    // console.log(element, 'jjjj');
    // this.point = {...this.point, isFavorite: !this.point.isFavorite};

    this.handleDataChange({...this.point, isFavorite: !this.point.isFavorite});
    // render(this.itemComponent, this.pointListContainer);
  };

  init(point) {

    const prevItemComponent = this.itemComponent;
    const prevEditItemComponent = this.editItemComponent;

    this.currentOffer = this.offers.find((offer) => offer.type === this.point.type);
    this.itemComponent = new TripEventsItemView(point, {...this.currentOffer}, this.destination, this.#showFormElement, this.#favoriteToggle);
    this.editItemComponent = new TripEventsEditItemView(point, {...this.currentOffer}, {...this.destination},
      this.#submitFormElement, this.#hideFormElement, this.#resetForm);

    if (prevItemComponent === null || prevEditItemComponent === null) {
      render(this.itemComponent, this.pointListContainer);
      return;
    }

    // if (this.pointListContainer.contains(prevItemComponent.element)) {
    //   replace(this.itemComponent, prevItemComponent);
    // }

    // if (this.pointListContainer.contains(prevEditItemComponent.element)) {
    //   replace(this.editItemComponent, prevEditItemComponent);
    // }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.itemComponent, prevItemComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.editItemComponent, prevEditItemComponent);
    }

    remove(prevItemComponent);
    remove(prevEditItemComponent);

    render (new PhotoeTemplate(this.destination), this.photoesContainer.element);
    // render (this.itemComponent, this.pointListContainer);
  }

  destroy() {
    remove(this.itemComponent);
    remove(this.editItemComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToCard();
    }
  }
}