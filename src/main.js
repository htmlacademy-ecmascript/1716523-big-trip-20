import HeaderFiltersView from './view/header-form-view.js';
import TripInfoView from './view/trip-info-view.js';
import TripSortView from './view/trip-sort-view.js';
import TripEventsListPresenter from './trip-events-presenter.js';
import { render, RenderPosition } from './framework/render.js';
import PointsModel from './model/way-point-model.js';
import MockService from './mock/service-mock.js';

const siteHeaderElement = document.querySelector('.page-header');
const siteTripInfoElement = siteHeaderElement.querySelector('.trip-main');
const siteFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');
const {offers, destinations, points} = new MockService();

const pointsModel = new PointsModel(offers, destinations, points);
const eventsListPresenter = new TripEventsListPresenter({listContainer: tripEventsElement, pointsModel});

render (new HeaderFiltersView, siteFiltersElement);
render (new TripInfoView, siteTripInfoElement, RenderPosition.AFTERBEGIN);
render (new TripSortView, tripEventsElement);

eventsListPresenter.init();
// eventsListPresenter.initEditItem();
