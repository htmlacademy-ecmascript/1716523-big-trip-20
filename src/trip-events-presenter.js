import { render, RenderPosition, replace, remove } from './framework/render';
import TripEventsListView from './view/trip-events-list-view';
import PhotoesContainer from './view/event-photoes-container-view';
import NoEvents from './view/no-events-view';
import TripSortView from './view/trip-sort-view.js';
import EventPointPresenter from './point-presenter';
import { eventsSort } from './utils';
import { SortType, UpdateType, UserAction } from './const';
import NewPointPresenter from './new-point-presenter';
import { filter, filterType } from './utils';
import UiBlocker from './framework/ui-blocker/ui-blocker.js';

import TripInfoPresenter from './trip-info-presenter';

const siteHeaderElement = document.querySelector('.page-header');
const siteTripInfoElement = siteHeaderElement.querySelector('.trip-main');

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class TripEventsListPresenter {
  tripEventsList = new TripEventsListView();
  #photoesContainer = new PhotoesContainer();
  #pointsPresenters = new Map();
  #defaultEventPoints = [];
  #currentSortType = SortType.DAY;
  #sortComponent = null;
  #sortedPoints = [];
  #newPointPresenter = null;
  #isPointCreating = false;
  #noEventsComponent = null;
  #filterModel = null;
  #filterType = null;
  #filteredPoints = null;
  #isLoading = null;

  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor({listContainer, pointsModel, filterModel, onNewPointDestroy}) {
    this.listContainer = listContainer;
    this.pointsModel = pointsModel;

    this.#filterModel = filterModel;

    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.tripEventsList.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy,
    });

    this.pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#isLoading = true;
  }

  get points() {

    switch (this.#currentSortType) {
      case SortType.DAY:
        this.#sortPoints(SortType.DAY);
        break;
      case SortType.PRICE:
        this.#sortPoints(SortType.PRICE);
        break;
      case SortType.EVENT:
        this.#sortPoints(SortType.EVENT);
        break;
      case SortType.TIME:
        this.#sortPoints(SortType.TIME);
        break;
      case SortType.OFFERS:
        this.#sortPoints(SortType.OFFERS);
        break;
    }
    return this.#sortedPoints;
  }

  get destinations() {
    return this.pointsModel.getDestinations();
  }

  get offers() {
    return this.pointsModel.getOffers();
  }


  init() {

    this.#defaultEventPoints = this.points;

    this.#renderPoints(this.#sortedPoints);

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
    this.#filterType = this.#filterModel.filter;
    const points = this.pointsModel.getPoints();
    this.#filteredPoints = filter[this.#filterType](points);
    this.showMessage();
    this.#currentSortType = sortType;
    this.#sortedPoints = eventsSort[this.#currentSortType](this.#filteredPoints);
    const tripInfoPresenter = new TripInfoPresenter(siteTripInfoElement, this.pointsModel);
    tripInfoPresenter.init();
  };

  #sortTypeChangeHandler = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearPointsList();
    this.#renderPoints(this.points);
  };

  showMessage = () => {
    if (this.#filteredPoints.length === 0 && !this.#isPointCreating && !this.#isLoading) {
      this.#noEventsComponent = new NoEvents(this.#filterType);
      this.#renderMessage();
    } else if (this.#isLoading) {
      this.#noEventsComponent = new NoEvents('loading');
      this.#renderMessage();
    }
  };

  #renderMessage = () => {
    render (this.#noEventsComponent, this.listContainer);
  };

  #renderPoints(sortedPoints) {
    render (this.tripEventsList, this.listContainer);
    sortedPoints.forEach((point) => {
      const eventPresenter = new EventPointPresenter(this.tripEventsList.element, this.offers, point, this.destinations,
        this.#photoesContainer, this.#handleViewAction, this.handleModeChange);
      eventPresenter.init(point);
      this.#pointsPresenters.set(point.id, eventPresenter);
      remove(this.#noEventsComponent);
    });
  }

  createPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, filterType.EVERYTHING);
    this.#newPointPresenter.init(this.#defaultEventPoints[0], this.offers, this.destinations);
    this.#isPointCreating = true;
    remove(this.#noEventsComponent);
  }

  #clearPointsList(resetSortType = false) {
    this.#newPointPresenter.destroy();
    this.#isPointCreating = false;
    this.#pointsPresenters.forEach((presenter) => presenter.destroy());
    this.#pointsPresenters.clear();

    remove(this.#noEventsComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointsPresenters.forEach((presenter) => {
      presenter.resetView();
    });
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsPresenters.get(update.id).setSaving();
        try {
          await this.pointsModel.updatePoint(updateType, update);
        } catch(err) {
          this.#pointsPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.pointsModel.addPoint(updateType, update);
        } catch(err) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointsPresenters.get(update.id).setDeleting();
        try {
          await this.pointsModel.deletePoint(updateType, update);
        } catch(err) {
          this.#pointsPresenters.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointsPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearPointsList();
        this.#renderPoints(this.points);
        break;
      case UpdateType.MAJOR:
        this.#clearPointsList(true);
        this.#renderPoints(this.points);
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        this.#clearPointsList();
        this.#renderPoints(this.points);
        break;
    }
  };
}
