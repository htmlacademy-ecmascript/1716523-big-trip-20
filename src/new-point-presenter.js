import {remove, render, RenderPosition} from './framework/render.js';
import {UserAction, UpdateType} from './const.js';
import NewPointItemView from './view/new-point-item-view.js';

export default class NewPointPresenter {
  #pointListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;

  #newPointComponent = null;

  constructor({pointListContainer, onDataChange, onDestroy}) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init(point, offer, destinations) {
    if (this.#newPointComponent !== null) {
      return;
    }
    this.#newPointComponent = new NewPointItemView({
      point,
      offer,
      destinations,
    },
    this.#handleFormSubmit, this.#handleDeleteClick);

    render(this.#newPointComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving() {
    this.#newPointComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#newPointComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#newPointComponent.shake(resetFormState);
  }


  destroy() {
    if (this.#newPointComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#newPointComponent);
    this.#newPointComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      {...point,
        dateFrom: new Date (point.dateFrom),
        dateTo: new Date(point.dateTo)
      }
    );
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
