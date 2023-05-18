import { render, replace, RenderPosition } from './framework/render';
import TripEventsListView from './view/trip-events-list-view';
import TripEventsEditItemView from './view/trip-events-edit-item-view.js';
import TripEventsItemView from './view/trip-events-item-view.js';
import PhotoeTemplate from './view/photo-view';
import PhotoesContainer from './view/event-photoes-container-view';
import NoEvents from './view/no-events-view';
import HeaderFiltersView from './view/header-form-view.js';
import TripInfoView from './view/trip-info-view.js';
import TripSortView from './view/trip-sort-view.js';
import FormWithoutDestination from './view/event-without-destination-view';


const siteMainElement = document.querySelector('.page-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');
const siteHeaderElement = document.querySelector('.page-header');
const siteTripInfoElement = siteHeaderElement.querySelector('.trip-main');
const siteFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');

export default class TripEventsListPresenter {
  #tripEventsList = new TripEventsListView();
  #photoesContainer = new PhotoesContainer();

  constructor({listContainer, pointsModel}) {
    this.listContainer = listContainer;
    this.pointsModel = pointsModel;
    this.offers = [...this.pointsModel.offers];
    this.destinations = [...this.pointsModel.destinations];
    this.points = [...this.pointsModel.points];
  }


  init() {

    render (new TripInfoView, siteTripInfoElement, RenderPosition.AFTERBEGIN);
    render (new TripSortView, tripEventsElement);
    render (new HeaderFiltersView, siteFiltersElement);

    this.#renderPoints();

  }

  #renderPoints() {
    if (!this.points) {
      const noEventsComponent = new NoEvents;
      render (noEventsComponent, this.listContainer);
    } else {
      render (this.#tripEventsList, this.listContainer);
      this.points.forEach((point, i) => {
        this.#renderPoint(this.offers, point, this.destinations[i]);
      });
    }
  }


  #renderPoint(offers, point, destination) {

    const currentOffer = offers.find((offer) => offer.type === point.type);
    const itemComponent = new TripEventsItemView({point}, {...currentOffer}, destination, showFormElement);
    const editItemComponent = new TripEventsEditItemView({point}, {...currentOffer}, {...destination},
      submitFormElement, hideFormElement, resetForm, addNewEvent);
    render (new PhotoeTemplate(destination), this.#photoesContainer.element);
    render (itemComponent, this.#tripEventsList.element);


    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    function addNewEvent() {
      render(new FormWithoutDestination(), this.listContainer);
    }

    function showFormElement() {
      replaceCardToForm();
      document.addEventListener('keydown', escKeyDownHandler);
    }
    function submitFormElement() {
      replaceFormToCard();
      document.removeEventListener('keydown', escKeyDownHandler);
    }
    function hideFormElement() {
      replaceFormToCard();
      document.removeEventListener('keydown', escKeyDownHandler);
    }

    function resetForm() {
      document.querySelector('form').reset();
    }

    function replaceCardToForm() {
      replace(editItemComponent, itemComponent);
    }

    function replaceFormToCard() {
      replace(itemComponent, editItemComponent);
    }
  }
}
