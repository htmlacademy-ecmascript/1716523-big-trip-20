import { render, RenderPosition, replace, remove } from './framework/render';
import TripEventsListView from './view/trip-events-list-view';
import PhotoesContainer from './view/event-photoes-container-view';
import NoEvents from './view/no-events-view';
import TripInfoView from './view/trip-info-view.js';
import TripSortView from './view/trip-sort-view.js';
import EventPointPresenter from './point-presenter';
import { eventsSort, updateItem } from './utils';
import { SortType } from './const';

const siteHeaderElement = document.querySelector('.page-header');
const siteTripInfoElement = siteHeaderElement.querySelector('.trip-main');

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

    this.#renderPoints();
    this.#sortPoints(this.#currentSortType);

    this.#renderSort(this.listContainer);
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
      this.points.forEach((point) => {
        const eventPresenter = new EventPointPresenter(this.tripEventsList.element, this.offers, point, this.destinations,
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
}
