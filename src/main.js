import HeaderFiltersView from './view/header-form-view';
import TripInfoView from './view/trip-info-view';
import TripSortView from './view/trip-sort-view';
import { render, RenderPosition } from './render';

const siteHeaderElement = document.querySelector('.page-header');
const siteTripInfoElement = siteHeaderElement.querySelector('.trip-main');
const siteFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');

render (new HeaderFiltersView, siteFiltersElement);
render (new TripInfoView, siteTripInfoElement, RenderPosition.AFTERBEGIN);
render (new TripSortView, tripEventsElement);
