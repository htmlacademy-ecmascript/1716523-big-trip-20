
import TripEventsListPresenter from './trip-events-presenter.js';
import PointsModel from './model/way-point-model.js';
import MockService from './mock/service-mock.js';

import FilterPresenter from './filter-presenter.js';

const siteMainElement = document.querySelector('.page-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');
const {offers, destinations, points} = new MockService();

const siteHeaderElement = document.querySelector('.page-header');
const siteFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');


const pointsModel = new PointsModel(offers, destinations, points);
const eventsListPresenter = new TripEventsListPresenter({listContainer: tripEventsElement, pointsModel});

const filter = new FilterPresenter({
  container:siteFiltersElement,
  pointsModel});

eventsListPresenter.init();
filter.init();
