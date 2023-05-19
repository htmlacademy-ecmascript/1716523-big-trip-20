
import TripEventsListPresenter from './trip-events-presenter.js';
import PointsModel from './model/way-point-model.js';
import MockService from './mock/service-mock.js';

const siteMainElement = document.querySelector('.page-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');
const {offers, destinations, points} = new MockService();

const pointsModel = new PointsModel(offers, destinations, points);
const eventsListPresenter = new TripEventsListPresenter({listContainer: tripEventsElement, pointsModel});


eventsListPresenter.init();
