import { render, replace } from './framework/render';
import TripEventsListView from './view/trip-events-list-view';
import TripEventsEditItemView from './view/trip-events-edit-item-view.js';
import TripEventsItemView from './view/trip-events-item-view.js';
import PhotoeTemplate from './view/photo-view';
import PhotoesContainer from './view/event-photoes-container-view';
import NoEvents from './view/no-events-view';

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
    const editItemComponent = new TripEventsEditItemView({point}, {...currentOffer}, {...destination}, submitFormElement, hideFormElement);
    render (new PhotoeTemplate(destination), this.#photoesContainer.element);
    render (itemComponent, this.#tripEventsList.element);

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

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

    function replaceCardToForm() {
      replace(editItemComponent, itemComponent);
    }

    function replaceFormToCard() {
      replace(itemComponent, editItemComponent);
    }
  }
}
