import { render, replace, remove} from './framework/render';
import TripEventsEditItemView from './view/trip-events-edit-item-view.js';
import TripEventsItemView from './view/trip-events-item-view.js';
import { UserAction, UpdateType } from './const';
import NewPointItemView from './view/new-point-item-view';

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

  constructor(pointListContainer, offers, point, destinations, photoesContainer, onDataChange, onModeChange) {
    this.pointListContainer = pointListContainer;
    this.point = point;
    this.offers = offers;
    this.destinations = destinations;
    this.photoesContainer = photoesContainer;
    this.handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point) {
    this.point = point;
    const prevItemComponent = this.itemComponent;
    const prevEditItemComponent = this.editItemComponent;

    this.itemComponent = new TripEventsItemView(point, this.offers, this.destinations, this.#showFormElement, this.#favoriteToggle);

    this.editItemComponent = new TripEventsEditItemView({
      point,
      offer: this.offers,
      destinations: this.destinations
    },
    this.#submitFormElement, this.#hideFormElement, this.#deletePoint);

    this.newPointComponent = new NewPointItemView({
      point,
      offer: this.offers,
      destinations: this.destinations
    },
    this.#submitFormElement, this.#hideFormElement, this.#deletePoint, this.#addPoint);

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
  }

  setSaving() {
    this.editItemComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setDeleting() {
    if (this.#mode === Mode.EDITING) {
      this.editItemComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  }

  setAborting() {
    if (this.#mode === Mode.DEFAULT) {
      this.itemComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.editItemComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.editItemComponent.shake(resetFormState);
  }


  destroy() {
    remove(this.itemComponent);
    remove(this.editItemComponent);
  }

  resetView() {
    if (this.#mode === Mode.EDITING) {
      this.editItemComponent.reset(this.point);
      this.#replaceFormToCard();
    }
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

  #submitFormElement = (updatedPoint) => {
    this.handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      updatedPoint,
    );
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #hideFormElement = () => {
    this.editItemComponent.reset(this.point);
    this.#replaceFormToCard();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #deletePoint = (point) => {
    this.handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  #addPoint = (point) => {
    this.handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
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
    this.handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      {...this.point, isFavorite: !this.point.isFavorite},
    );
  };
}
