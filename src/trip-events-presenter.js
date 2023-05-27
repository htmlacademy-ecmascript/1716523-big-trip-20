import { render, RenderPosition, replace, remove } from './framework/render';
import TripEventsListView from './view/trip-events-list-view';
// import TripEventsEditItemView from './view/trip-events-edit-item-view.js';
// import TripEventsItemView from './view/trip-events-item-view.js';
// import PhotoeTemplate from './view/photo-view';
import PhotoesContainer from './view/event-photoes-container-view';
import NoEvents from './view/no-events-view';
import TripInfoView from './view/trip-info-view.js';
import TripSortView from './view/trip-sort-view.js';
import FormWithoutDestination from './view/event-without-destination-view';
import EventPointPresenter from './point-presenter';
import { eventsSort, updateItem } from './utils';
import { SortType } from './const';


const siteMainElement = document.querySelector('.page-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');
const siteHeaderElement = document.querySelector('.page-header');
const siteTripInfoElement = siteHeaderElement.querySelector('.trip-main');

const addNewEventButton = document.querySelector('.trip-main__event-add-btn');

export default class TripEventsListPresenter {
  tripEventsList = new TripEventsListView();
  points = [];
  #photoesContainer = new PhotoesContainer();
  #pointsPresenters = new Map();
  #defaultEventPoints = [];
  #currentSortType = SortType.DAY;
  #sortComponent = null;

  constructor({listContainer, pointsModel}) {
    this.listContainer = listContainer;
    this.pointsModel = pointsModel;
    this.offers = [...this.pointsModel.offers];
    this.destinations = [...this.pointsModel.destinations];
    this.points = [...this.pointsModel.points];
  }


  init() {

    this.#defaultEventPoints = [...this.pointsModel.points];

    render (new TripInfoView, siteTripInfoElement, RenderPosition.AFTERBEGIN);
    // render (new TripSortView({
    //   sortType: this.#currentSortType,
    //   onSortTypeChange: this.#sortTypeChangeHandler,
    // }), tripEventsElement);

    this.#renderPoints();
    this.#sortPoints(this.#currentSortType);

    this.#renderSort(this.listContainer);

    const addNewEvent = () => {
      render(new FormWithoutDestination(), this.tripEventsList.element, RenderPosition.AFTERBEGIN);
    };

    addNewEventButton.addEventListener('click', addNewEvent);

  }

  #renderSort = (container) => {
    const prevSortComponent = this.#sortComponent;

    this.#sortComponent = new TripSortView({
      sortType: this.#currentSortType,
      onSortTypeChange: this.#sortTypeChangeHandler,
    });
    if (prevSortComponent) {
      replace(this.#sortComponent, prevSortComponent);
      remove(prevSortComponent);
    } else {
      render(this.#sortComponent, container, RenderPosition.AFTERBEGIN);
    }

  };


  #sortPoints = (sortType) => {
    console.log('sortPoints', eventsSort, this.#currentSortType)
    this.#currentSortType = sortType;
    this.points = eventsSort[this.#currentSortType](this.points);
  };

  #sortTypeChangeHandler = (sortType) => {
    this.#sortPoints(sortType);
    this.#clearPointsList();
    this.#renderSort(this.tripEventsElement);
    this.#renderPoints();
  };

  #renderPoints() {
    if (!this.points) {
      const noEventsComponent = new NoEvents;
      render (noEventsComponent, this.listContainer);
    } else {
      render (this.tripEventsList, this.listContainer);
      console.log(this.points, 'fff')
      this.points.forEach((point, i) => {
        // this.#renderPoint(this.offers, point, this.destinations[i]);
        const eventPresenter = new EventPointPresenter(this.tripEventsList.element, this.offers, point, this.destinations[i],
          this.#photoesContainer, this.#handlePointChange, this.#handleModeChange);
        eventPresenter.init(point);
        this.#pointsPresenters.set(point.id, eventPresenter);
      });
    }
  }

  #clearPointsList() {
    this.#pointsPresenters.forEach((presenter) => presenter.destroy());
    this.#pointsPresenters.clear();
  }

  #handlePointChange = (updatedPoint) => {
    this.points = updateItem(this.points, updatedPoint);
    this.#pointsPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointsPresenters.forEach((presenter) => {
      presenter.resetView();
    });
  };


  // #renderPoint(offers, point, destination) {

  //   const currentOffer = offers.find((offer) => offer.type === point.type);
  //   const itemComponent = new TripEventsItemView({point}, {...currentOffer}, destination, showFormElement);
  //   const editItemComponent = new TripEventsEditItemView({point}, {...currentOffer}, {...destination},
  //     submitFormElement, hideFormElement, resetForm);
  //   render (new PhotoeTemplate(destination), this.#photoesContainer.element);
  //   render (itemComponent, this.tripEventsList.element);


  //   const escKeyDownHandler = (evt) => {
  //     if (evt.key === 'Escape') {
  //       evt.preventDefault();
  //       replaceFormToCard();
  //       document.removeEventListener('keydown', escKeyDownHandler);
  //     }
  //   };

  //   function showFormElement() {
  //     replaceCardToForm();
  //     document.addEventListener('keydown', escKeyDownHandler);
  //   }
  //   function submitFormElement() {
  //     replaceFormToCard();
  //     document.removeEventListener('keydown', escKeyDownHandler);
  //   }
  //   function hideFormElement() {
  //     replaceFormToCard();
  //     document.removeEventListener('keydown', escKeyDownHandler);
  //   }

  //   function resetForm() {
  //     document.querySelector('form').reset();
  //   }

  //   function replaceCardToForm() {
  //     replace(editItemComponent, itemComponent);
  //   }

  //   function replaceFormToCard() {
  //     replace(itemComponent, editItemComponent);
  //   }
  // }
}
