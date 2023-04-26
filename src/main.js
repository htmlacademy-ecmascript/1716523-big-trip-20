import HeaderFormView from './view/header-form-view';
import TripInfoView from './view/trip-info-view';
import { render } from './render';

const siteHeaderElement = document.querySelector('.page-header');
const siteTripInfoElement = siteHeaderElement.querySelector('.trip-main');
const siteFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');

render (new HeaderFormView, siteFiltersElement);
render (new TripInfoView, siteTripInfoElement);
