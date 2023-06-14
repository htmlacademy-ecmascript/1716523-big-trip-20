
import TripEventsListPresenter from './trip-events-presenter.js';
import PointsModel from './model/way-point-model.js';
import MockService from './mock/service-mock.js';

import FilterPresenter from './filter-presenter.js';

import NewPointButtonView from './view/add-new-point-button-view.js';
import { render } from './framework/render.js';

import FilterModel from './model/filter-model.js';

const siteMainElement = document.querySelector('.page-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');
const {offers, destinations, points} = new MockService();

const siteHeaderElement = document.querySelector('.page-header');
const siteFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const tripMainElement = document.querySelector('.trip-main');
const filterModel = new FilterModel();

const pointsModel = new PointsModel(offers, destinations, points);
const eventsListPresenter = new TripEventsListPresenter({listContainer: tripEventsElement, pointsModel, filterModel});

const filterPresenter = new FilterPresenter({
  filterContainer:siteFiltersElement,
  pointsModel,
  filterModel,
});

const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick
});

render(newPointButtonComponent, tripMainElement);

function handleNewPointButtonClick() {
  eventsListPresenter.createPoint();
}


eventsListPresenter.init();
filterPresenter.init();
