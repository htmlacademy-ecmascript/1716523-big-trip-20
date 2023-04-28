import HeaderFiltersView from './view/header-form-view.js';
import TripInfoView from './view/trip-info-view.js';
import TripSortView from './view/trip-sort-view.js';
import TripEventsListPresenter from './view/trip-events-presenter.js';
import { render, RenderPosition } from './render.js';

const siteHeaderElement = document.querySelector('.page-header');
const siteTripInfoElement = siteHeaderElement.querySelector('.trip-main');
const siteFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');
const eventsListPresenter = new TripEventsListPresenter({listContainer: tripEventsElement});

render (new HeaderFiltersView, siteFiltersElement);
render (new TripInfoView, siteTripInfoElement, RenderPosition.AFTERBEGIN);
render (new TripSortView, tripEventsElement);

eventsListPresenter.init();
