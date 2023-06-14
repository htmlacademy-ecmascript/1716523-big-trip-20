import { render, RenderPosition, replace, remove } from './framework/render';
import TripEventsListView from './view/trip-events-list-view';
import PhotoesContainer from './view/event-photoes-container-view';
import NoEvents from './view/no-events-view';
import TripInfoView from './view/trip-info-view.js';
import TripSortView from './view/trip-sort-view.js';
import EventPointPresenter from './point-presenter';
import { eventsSort } from './utils';
import { SortType, UpdateType, UserAction } from './const';
import NewPointPresenter from './new-point-presenter';
import { filter } from './utils';

const siteHeaderElement = document.querySelector('.page-header');
const siteTripInfoElement = siteHeaderElement.querySelector('.trip-main');

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

  constructor({listContainer, pointsModel, filterModel}) {
    this.listContainer = listContainer;
    this.pointsModel = pointsModel;

    this.#filterModel = filterModel;

    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.tripEventsList.element,
      onDataChange: this.#handleViewAction,
      onDestroy: this.destroy,
    });

    this.pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
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
    return this.pointsModel.destinations;
  }

  get offers() {
    return this.pointsModel.offers;
  }


  init() {

    this.#defaultEventPoints = this.points;

    render (new TripInfoView, siteTripInfoElement, RenderPosition.AFTERBEGIN);

    this.#renderPoints(this.#sortedPoints);

    this.#renderSort(this.listContainer);
  }

  createPoint() {
    this.#currentSortType = SortType.DAY;
    this.#newPointPresenter.init(this.pointsModel.points[0], this.offers, this.destinations);
    this.#isPointCreating = true;
    remove(this.#noEventsComponent);
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
    const points = this.pointsModel.points;
    this.#filteredPoints = filter[this.#filterType](points);
    this.#currentSortType = sortType;
    this.#sortedPoints = eventsSort[this.#currentSortType](this.#filteredPoints);
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
    if (this.#filteredPoints.length === 0 && !this.#isPointCreating) {
      this.#noEventsComponent = new NoEvents(this.#filterType);
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
        this.#photoesContainer, this.#handleViewAction, this.#handleModeChange);
      eventPresenter.init(point);
      this.#pointsPresenters.set(point.id, eventPresenter);
    });
    this.showMessage();
  }

  #clearPointsList(resetSortType = false) {
    this.#isPointCreating = false;
    this.#pointsPresenters.forEach((presenter) => presenter.destroy());
    this.#pointsPresenters.clear();

    remove(this.#noEventsComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #handleModeChange = () => {
    this.#pointsPresenters.forEach((presenter) => {
      presenter.resetView();
    });
  };

  #handleViewAction = (actionType, updateType, update) => {
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
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
    }
  };
}
